import * as postService from '../../services/post.js'
import type { Request, Response } from 'express'
import type { CreatePostRequest } from '../dto/post/requests.js'

export const getPosts = (req: Request, res: Response) => {
    const { category, take } = req.query

    const categoryString = typeof category === 'string' ? category : undefined
    const takeNumber = take ? Number(take) : undefined

    if (takeNumber && (!Number.isInteger(takeNumber) || takeNumber <= 0)) {
        return res.status(400).json({ message: 'Take must be a positive integer' })
    }

    res.status(200).json(postService.getPosts(categoryString, takeNumber))
}

export const getPostById = (req: Request, res: Response) => {
    const { id } = req.params
    const postId = Number(id)

    if (!Number.isInteger(postId) || postId <= 0) {
        return res.status(400).json({ message: 'Id must be a positive integer' })
    }

    const post = postService.getPostById(postId)

    if (!post) {
        return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post)
}

export const createPost = async (req: Request, res: Response) => {
    const { name, content, author, category }: CreatePostRequest = req.body || {}

    if (
        typeof name !== 'string' || !name.trim() ||
        typeof content !== 'string' || !content.trim() ||
        typeof author !== 'string' || !author.trim() ||
        typeof category !== 'string' || !category.trim()
    ) {
        return res.status(422).json({ message: "Invalid post data" })
    }

    try {
        const createdPost = await postService.createdPost({ name, content, author, category })

        if (!createdPost) {
            return res.status(409).json({ message: "Post already exists" })
        }

        return res.status(201).json(createdPost)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to create post' })
    }
}