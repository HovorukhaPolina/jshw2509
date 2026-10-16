import type { Category } from "./entity.js"

export interface CategoryRepository {
    getAll(): Promise<Category[]>
    getById(id: number): Promise<Category | undefined>
    findByName(name: string): Promise<Category | undefined>
    createCategory(data: {name: string}): Promise<Category>
}