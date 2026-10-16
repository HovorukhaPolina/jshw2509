import type { PostRepository } from "../domain/post/repository.js"
import { isStructuredError } from "@prisma/orm-postgres/utils"

type DataBase = typeof import("../prisma/db.js").db

export function createPostRepository(database: DataBase): PostRepository {
    return {
        async getAll(categoryId?: number, take?: number) {
            let query = categoryId !== undefined ? database.orm.public.Post.where({ categoryId }) 
                : database.orm.public.Post;

            query = query.include("category").orderBy((post) => post.id.asc());

            if (!take) {
                return query.all();
            }

            return query.limit(take).all();
        },
        async getById(id: number) {
            const post = await database.orm.public.Post.where({ id }).include("category").first()
            return post ?? undefined
        },

        async findByName(name: string) {
            const pattern = name.replace(/[\\%_]/g, '\\$&')
            const post = await database.orm.public.Post.where((row) => row.name.ilike(pattern)).first()
            return post ?? undefined
        },

        createPost(data) {
            const { categoryId, ...postData } = data
            return database.orm.public.Post.create({...postData,
                category: (category) => category.connect({ id: categoryId })
            })
        }
    }
}