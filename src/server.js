import express from 'express';
import postRouter from './routers/post.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});