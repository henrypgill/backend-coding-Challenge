import { Injectable } from "@nestjs/common";
import { database } from "..";
import type { Author } from "../types/book";
import { ObjectId } from "mongodb";

@Injectable()
export class AuthorService {
    async getAuthors(): Promise<Author[]> {
        const cursor = await database.authors.find();
        const Authors = cursor.toArray();
        return Authors;
    }

    async getAuthorsById(authorIds: ObjectId[]): Promise<Author[]> {
        const cursor = await database.authors.find<Author>({
            _id: { $in: authorIds },
        });
        return cursor.toArray();
    }

    async createAuthors(authors: Author[]): Promise<Author[]> {
        const result = await database.authors.insertMany(authors);
        const insertedIds: ObjectId[] = [];
        for (let index in result.insertedIds) {
            insertedIds.push(result.insertedIds[index]);
        }

        const createdAuthors = this.getAuthorsById(insertedIds);
        return createdAuthors;
    }
}
``;
