import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createPostRouter } from './transport/routers/post.js'
import { createPostHandler } from './transport/handlers/post.js'
import { createPostRepository } from './repositories/post.js'
import { createPostService } from './services/post.js'
import { createCategoryRouter } from './transport/routers/category.js'
import { createCategoryHandler } from './transport/handlers/category.js'
import { createCategoryRepository } from './repositories/category.js'
import { createCategoryService } from './services/category.js'
import { db } from './prisma/db.js'
import { createUserRepository } from './repositories/user.js'
import { createRefreshSessionRepository } from './repositories/refresh-session.js'
import { createAuthService } from './services/auth/auth.js'
import { hashPassword, verifyPassword } from './lib/password.js'
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, hashRefreshToken } from './lib/jwt.js'
import { createAuthHandler } from './transport/handlers/auth.js'
import { createAuthRouter } from './transport/routers/auth.js'
import { createRequireAuth } from './transport/middlewares/require-auth.js'

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use(express.json())

const categoryRepository = createCategoryRepository(db)
const categoryService = createCategoryService(categoryRepository)
const categoryHandlers = createCategoryHandler(categoryService)
const categoryRouter = createCategoryRouter(categoryHandlers)

const postRepository = createPostRepository(db)
const postService = createPostService(postRepository, categoryRepository)
const postHandlers = createPostHandler(postService)
const postRouter = createPostRouter(postHandlers)

const userRepository = createUserRepository(db)
const refreshSessionRepository = createRefreshSessionRepository(db)

const authService = createAuthService(
    userRepository,
    { hash: hashPassword, verify: verifyPassword },
    { signAccessToken, signRefreshToken },
    { verifyRefreshToken },
    refreshSessionRepository,
    { hash: hashRefreshToken }
)

const authHandler = createAuthHandler(authService)
const requireAuth = createRequireAuth(verifyAccessToken)
const authRouter = createAuthRouter(authHandler, requireAuth)

app.use('/posts', postRouter)
app.use('/categories', categoryRouter)
app.use('/auth', authRouter)

const PORT = 8000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен на http://${HOST}:${PORT}`)
})