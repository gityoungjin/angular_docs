export interface Book {
    _id: string;
    title: string;
    description: string;
    author: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
