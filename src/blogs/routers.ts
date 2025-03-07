
import { Router } from 'express';
import { blogValidators } from './validators';
import { authMiddleware } from '../common/authMiddleware';
import { inputCheckErrorsMiddleware } from '../common/validationMiddleware';
import { blogRepository } from './blogRepository';

export const blogsRouter = Router();

blogsRouter.get('/', async (req, res) => {
    const blogs = await blogRepository.getAll();
    res.status(200).json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await blogRepository.getById(req.params.id);
    blog ? res.json(blog) : res.sendStatus(404);
});

blogsRouter.post('/',
    authMiddleware,
    ...blogValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const newBlog = await blogRepository.create(req.body);
        res.status(201).json(newBlog);
    }
);

blogsRouter.put('/:id',
    authMiddleware,
    ...blogValidators,
    inputCheckErrorsMiddleware,
    async (req, res) => {
        const updated = await blogRepository.update(req.params.id, req.body);
        updated ? res.sendStatus(204) : res.sendStatus(404);
    }
);

blogsRouter.delete('/:id',
    authMiddleware,
    async (req, res) => {
        const deleted = await blogRepository.delete(req.params.id);
        deleted ? res.sendStatus(204) : res.sendStatus(404);
    }
);