import { Injectable } from "@nestjs/common";
import { database } from "../..";
import type { Publisher } from "../../types/book";
import { ObjectId } from "mongodb";

@Injectable()
export class PublishersService {
    async getPublishers(): Promise<Publisher[]> {
        const cursor = await database.publishers.find();
        const publishers = cursor.toArray();
        return publishers;
    }

    async getPublishersById(publisherIds: ObjectId[]): Promise<Publisher[]> {
        const cursor = await database.publishers.find<Publisher>({
            _id: { $in: publisherIds },
        });
        return cursor.toArray();
    }

    async createPublishers(publishers: Publisher[]): Promise<Publisher[]> {
        const result = await database.publishers.insertMany(publishers);
        const insertedIds: ObjectId[] = [];
        for (let index in result.insertedIds) {
            insertedIds.push(result.insertedIds[index]);
        }

        const createdPublishers = this.getPublishersById(insertedIds);
        return createdPublishers;
    }
}
