import type { Post } from "../domain/post/entity.js"
import type { PostRepository } from "../domain/post/repository.js"
import type { db } from "../prisma/db.js"

type DataBase = typeof import("../prisma/db.js").db

export function createPostRepository(database: DataBase): PostRepository {
    return {
        async getAll(category?: string, take?: number) {
            let query = database.orm.public.Post.orderBy((post) => 
                post.id.asc()
            )
            if (category) {
                query = query.where({ category })
            }
            if (!take) {
                return query.all()
            }
            return query.limit(take).all()
        },

        async getById(id: number) {
            const post = await database.orm.public.Post.where({ id }).first()

            return post ?? undefined
        },

        async findByName(name: string) {
            const post = await database.orm.public.Post.where({ name }).first()
            return post ?? undefined
        },

        async createPost(data) {
            return database.orm.public.Post.create(data)
        }
    }
}