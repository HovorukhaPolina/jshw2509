import type { Request, Response } from "express"
import type { AuthService } from "../../services/auth/auth.types.js"
import type { AuthCredentialRequest } from "../dto/auth/requests.js"

export interface AuthHandler{
    register(
        req: Request<{}, {}, AuthCredentialRequest>,
        res: Response
    ): Promise<void>
    login(
        req: Request<{}, {}, AuthCredentialRequest>,
        res: Response
    ): Promise<void>
    refresh(req: Request, res: Response): Promise<void>
    logout(req: Request, res: Response): Promise<void>
    me(req: Request, res: Response): Promise<void>
}
function cookieOptions(maxAge: number) {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge,
        path: "/",
    }
}

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie("accessToken", accessToken, cookieOptions(15 * 60 * 1000))
    res.cookie("refreshToken", refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000))
}

function clearAuthCookies(res: Response) {
    const clearOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    }
    res.clearCookie("accessToken", clearOptions)
    res.clearCookie("refreshToken", clearOptions)
}

export function createAuthHandler(service: AuthService):AuthHandler{
    return{
        async register(req, res){
            try{
                const {email, password} = req.body
                const user = await service.register({email, password})
                res.status(201).json(user)
            }
            catch(error){
                if(error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS"){
                    res.status(409).json({message: "EMAIL_ALREADY_EXISTS"})
                    return
                }
                console.error(error)
                res.status(500).json({message: "INTERNAL_SERVER_ERROR"})
                
            }
        },
        async login(req, res){
            try{
                const {email, password} = req.body
                const result = await service.login({email, password})
                setAuthCookies(res, result.accessToken, result.refreshToken)
                res.status(200).json({user: result.user})
            }
            catch(error){
                if (error instanceof Error && error.message === "INVALID_DATA"){
                    res.status(401).json({message: 'invalid data'})
                    return
                }
                console.error(error)
                res.status(500).json({message: "INTERNAL_SERVER_ERROR"})
            }
        },
        async refresh(req, res) {
            try {
                const refreshToken = req.cookies?.refreshToken
                if (typeof refreshToken !== "string") {
                    res.status(401).json({ message: "Unauthorized" })
                    return
                }
                const result = await service.refresh(refreshToken)
                setAuthCookies(res, result.accessToken, result.refreshToken)
                res.status(200).json({ ok: true })
            } catch (error) {
                if (error instanceof Error && error.message === "INVALID_REFRESH_TOKEN") {
                    res.status(401).json({ message: "Unauthorized" })
                    return
                }
                console.error(error)
                res.status(500).json({ message: "INTERNAL_SERVER_ERROR" })
            }
        },

        async logout(req, res) {
            try {
                const refreshToken = req.cookies?.refreshToken
                if (typeof refreshToken === "string") {
                    await service.logout(refreshToken)
                }
                clearAuthCookies(res)
                res.status(204).send()
            } catch (error) {
                clearAuthCookies(res)
                if (error instanceof Error && error.message === "INVALID_REFRESH_TOKEN") {
                    res.status(204).send()
                    return
                }
                console.error(error)
                res.status(500).json({ message: "INTERNAL_SERVER_ERROR" })
            }
        },

        async me(req, res) {
            try {
                const userId = res.locals.userId
                if (typeof userId !== "number") {
                    res.status(401).json({ message: "Unauthorized" })
                    return
                }
                const user = await service.me(userId)
                res.status(200).json(user)
            } catch (error) {
                console.error(error)
                res.status(500).json({ message: "INTERNAL_SERVER_ERROR" })
            }
        },
    }
}