import { ObjectId } from "mongodb";

export interface Book {
    _id?: ObjectId;
    title: string;
    author_ids: string[];
    publisherId: string;
    pageCount: number;
    edition: number;
    publishYear: number;
    stockCount: number;
}
export type BookWithout_id = Omit<Book, "_id">;
export type BookStockCount = Pick<Book, "_id" | "stockCount" | "title">;

export interface Author {
    _id?: ObjectId;
    name: string;
}
export type AuthorWithout_id = Omit<Author, "_id">;

export interface Publisher {
    _id?: ObjectId;
    name: string;
    location: string;
}
export type PublisherWithout_id = Omit<Publisher, "_id">;
