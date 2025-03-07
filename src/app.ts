import express from 'express';
import { blogsRouter } from './blogs/routers';
import { postsRouter } from './posts/routers';
import { testingRouter } from './testing/router';
import cors from 'cors';




const app = express();
app.use(express.json());
app.use(cors());

app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.use('/testing', testingRouter);

export default app;