import type { Post } from "../../domain/post/entity.js"

export interface CreatePostInput {
    name: string
    content: string
    author: string
    categoryId: number
}

export interface PostService {
    getPosts(category?: string, categoryId?: number, take?: number): Promise<Post[]>
    getPostById(id: number): Promise<Post | undefined>
    createPost(input: CreatePostInput): Promise<Post | null | undefined>
}