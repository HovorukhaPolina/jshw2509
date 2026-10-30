import type { RequestHandler } from "express";

//ну тут думаю понятно создаем функциб проверки на регистрацию
export function createRequireAuth(
    verifyAccessToken: (token: string)=> number
): RequestHandler{
    return (req, res, next)=>{
        //получаем токен из кукис
        const token = req.cookies?.accessToken
        //если токен не строго равняется стринге то отклоняем запрос и выдаем ошибку 401 не зареган
        if (typeof token !== "string"){
            res.status(401).json({message: "Unauthorized"})
            return 
        }
        try{
            //сохраняем в переменной рес локалс проверку на верификацию токена и если норм все получаем идентификатор пользователя ну токен
            res.locals.userId = verifyAccessToken(token)
            //передаем следуюзему миделвейр обработчику
            next()
        } catch{
            //при любой ошибке верификации означаем что юзер не зареган
            res.status(401).json({message: "Unauthorized"})
        }
    }
}