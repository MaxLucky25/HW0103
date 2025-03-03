
export type BlogDBType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
};

export type BlogViewModel = BlogDBType;

export type BlogInputModel = Pick<BlogDBType, 'name' | 'description' | 'websiteUrl'>;