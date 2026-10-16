import type { CategoryHandlers } from "../handlers/category.js"

import { Router } from "express"
export function createCategoryRouter(handlers: CategoryHandlers) {
    const router = Router()
    router.get("/", handlers.getCategories)
    router.get("/:id", handlers.getCategoryById)
    router.post("/", handlers.createCategory)

    return router
}