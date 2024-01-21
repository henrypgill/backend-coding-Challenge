import { MongoClient } from "mongodb";
import type { Author, Book, Publisher } from "../types/book";

export type MongoDbConnection = ReturnType<typeof setupMongoClient>;

export function setupMongoClient(database_url: string) {
    const client = new MongoClient(database_url);

    const db = client.db();
    const books = db.collection<Book>("books");
    const authors = db.collection<Author>("authors");
    const publishers = db.collection<Publisher>("publishers");

    return {
        client,
        db,
        books,
        authors,
        publishers,
    };

}
