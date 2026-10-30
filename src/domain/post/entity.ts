import type { Category } from "../category/entity.js"

export interface Post {
    id: number
    name: string
    content: string
    authorId: number
    categoryId: number
}

export type PostWithCategory = Post & { category: Category }