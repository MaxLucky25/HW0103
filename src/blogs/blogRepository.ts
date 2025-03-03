
import { BlogDBType, BlogInputModel, BlogViewModel } from './models';
import {blogCollection} from "../db/mongo-db";

export const blogRepository = {
    async getAll(): Promise<BlogViewModel[]> {
        const blogs = await blogCollection.find({},{projection:{_id:0} }).toArray();
        return blogs as BlogViewModel[];
    },

    async create(input: BlogInputModel): Promise<BlogViewModel> {
        const newBlog: BlogDBType = {
            id: Date.now().toString(),
            ...input,
            createdAt: new Date(),
            isMembership: false,
        };
        await blogCollection.insertOne(newBlog);
        return newBlog;
    },

    async getById(id: string): Promise<BlogViewModel | null> {
        const blog = await blogCollection.findOne(
            {id:id},
            {projection:{_id:0}}
        );
        return blog as BlogViewModel | null;
    },

    async update(id: string, input: BlogInputModel): Promise<boolean> {
       const result = await blogCollection.updateOne(
           {id:id},
           { $set: {
                   name: input.name,
                   description: input.description,
                   websiteUrl: input.websiteUrl
               }}
       );
       return result.matchedCount === 1;
    },

    async delete(id: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({id:id});
        return result.deletedCount === 1;
    },

};