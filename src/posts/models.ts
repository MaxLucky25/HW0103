
export type PostDBType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: Date;
};

export type PostViewModel =PostDBType;

export type PostInputModel = Pick<PostDBType, 'title' | 'shortDescription' | 'content' | 'blogId'>;