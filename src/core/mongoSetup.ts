import { MongoClient } from "mongodb";
import type { Book } from "../types/book";

export type MongoDbConnection = ReturnType<typeof setupMongoClient>;

export function setupMongoClient(database_url: string) {
    
    // try {
        const client = new MongoClient(database_url);

        const db = client.db();
        const books = db.collection<Book>("users");

        return {
            client,
            db,
            books,
        };

    // } catch (error) {
    //     console.error(error)
    // }


}
