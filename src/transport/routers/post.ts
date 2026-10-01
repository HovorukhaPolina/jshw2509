import { Router } from 'express'
import { createPostRepository } from '../../repositories/post.js'
import { createPostService } from '../../services/post.js'
import { createPostHandler } from '../handlers/post.js'

const postRouter = Router()
const postRepository = createPostRepository()
const postService = createPostService(postRepository)
const postHandler = createPostHandler(postService)

postRouter.get('/', postHandler.getPosts)
postRouter.get('/:id', postHandler.getPostById)
postRouter.post('/', postHandler.createPost)

export default postRouter