import { ObjectId } from "mongodb";


export interface Book {
    _id?: ObjectId;
    title: string;
    author_ids: string[];
    publisherId: string;
    pageCount: number;
    edition:  number;
    publishYear: number;
}