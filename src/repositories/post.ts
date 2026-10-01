import type { Post } from "../domain/post/entity.js"
import type { PostRepository } from "../domain/post/repository.js"

export function createPostRepository(): PostRepository {
    let posts: Post[] = [
        { 
            id: 1,
            name: "lesson 1", 
            content: "express — це веб-фреймворк", 
            author: "Arina", 
            category: "programming"
        },
        { 
            id: 2, 
            name: "lesson 2", 
            content: "огляд JS", 
            author: "Kira", 
            category: "programming" 
        },
        { 
            id: 3, 
            name: "lesson 3", 
            content: "UI/UX дизайн", 
            author: "Polya", 
            category: "design" 
        }
    ]

    return {
        async getAll(category?: string, take?: number) {
            let result = [...posts]
            if (category) {
                result = result.filter(post => post.category === category)
            }
            return take === undefined ? result : result.slice(0, take)
        },

        async getById(id: number) {
            return posts.find((post) => post.id === id)
        },

        async findByName(name: string) {
            return posts.find((post) => post.name.toLowerCase() === name.toLowerCase())
        },

        async createPost(data) {
            await new Promise<void>((resolve) => {
                setTimeout(resolve, 500)
            })
            const newId = posts.length + 1
            const newPost: Post = {
                id: newId,
                ...data
            }
            posts = [...posts, newPost]
            return newPost
        }
    }
}