import { PostDBType, PostInputModel, PostViewModel } from './models';
import { blogRepository } from '../blogs/blogRepository';
import {postCollection} from "../db/mongo-db";

export const postRepository = {

    async getAll(): Promise<PostViewModel[]> {
        const posts = await postCollection.find({},{projection: {_id: 0} }).toArray();
        return posts as PostViewModel[];
    },

    async create(input: PostInputModel): Promise<PostViewModel | null> {
        const blog = await blogRepository.getById(input.blogId);
        if (!blog) return null;

        const newPost: PostDBType = {
            id: Date.now().toString(),
            title: input.title,
            shortDescription: input.shortDescription,
            content: input.content,
            blogId: input.blogId,
            blogName: blog.name,
            createdAt: new Date()
        };

       await postCollection.insertOne(newPost);
       return newPost;
    },

    async getById(id: string): Promise<PostViewModel | null> {
        const post = await postCollection.findOne(
            {id:id},
            {projection: {_id: 0} }
        );
        return post as PostViewModel | null;
    },

    async update(id: string, input: PostInputModel): Promise<boolean> {
        const blog = await blogRepository.getById(input.blogId);
        if (!blog) return false;

        const result = await postCollection.updateOne(
            {id: id},
            {
                $set: {
                    title: input.title,
                    shortDescription: input.shortDescription,
                    content: input.content,
                    blogId: input.blogId,
                    blogName: blog.name,
                }
            }
        );
        return result.matchedCount === 1;
    },

    async delete(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({ id: id });
        return result.deletedCount === 1;
    },


};