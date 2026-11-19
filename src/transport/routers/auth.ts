import { Router } from "express";
import type { AuthHandler } from "../handlers/auth.js";
import type { RequestHandler } from "express";

export function createAuthRouter(handler: AuthHandler, requireAuth: RequestHandler) {
    const router = Router();
    router.post("/register", handler.register);
    router.post("/login", handler.login);
    router.post("/refresh", handler.refresh);
    router.post("/logout", handler.logout);
    router.get("/me", requireAuth, handler.me);
    return router;
}