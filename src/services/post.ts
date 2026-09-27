import * as postRepository from "../repositories/post.js"
import type { Post } from "../repositories/post.js"
import type { CreatePostRequest } from "../transport/dto/post/requests.js"

export const getPosts = (category?: string, take?: number): Post[] => {
    return postRepository.getAll(category, take)
}

export const getPostById = (id: number): Post | undefined => {
    return postRepository.getById(id)
}

export const createdPost = async (data: CreatePostRequest): Promise<Post | null> => {
    const duplicate = postRepository.findByName(data.name)
    if (duplicate) {
        return null
    }

    const posts = postRepository.getAll()
    const newPost: Post = {
        id: posts.length + 1,
        name: data.name.trim(),
        content: data.content.trim(),
        author: data.author.trim(),
        category: data.category.trim()
    }

    return await postRepository.addPost(newPost)
}