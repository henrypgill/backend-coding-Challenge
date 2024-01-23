import { MongoClient } from "mongodb";
import type { Author, Book, Publisher } from "../types/book";

export type MongoDbConnection = ReturnType<typeof setupMongoClient>;

export function setupMongoClient() {
    const db_uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database:27017`; ///${process.env.MONGODB_DATABASE}`

    const client = new MongoClient(db_uri);

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
