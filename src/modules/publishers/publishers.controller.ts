import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ObjectId } from "mongodb";
import type { POST_CreatePublisherBody } from "../../types/api";
import type { Publisher } from "../../types/book";
import { PublishersService } from "./publishers.service";

@Controller()
export class PublishersController {
    constructor(private readonly publisherService: PublishersService) {}

    @Get("/")
    async getAllPublishers(): Promise<Publisher[]> {
        return this.publisherService.getPublishers();
    }

    @Get("/id?ids=:ids")
    async getPublishersById(
        @Query("idString") idString: string,
    ): Promise<Publisher[]> {
        const publisherIds: ObjectId[] = idString
            .split(",")
            .map((id) => new ObjectId(id));
        return this.publisherService.getPublishersById(publisherIds);
    }

    @Post("/")
    async createPublisher(
        @Body() { publishers }: POST_CreatePublisherBody,
    ): Promise<Publisher[]> {
        const publishersWithoutId = publishers.map((publisher) => {
            delete publisher._id;
            return publisher;
        });
        return await this.publisherService.createPublishers(
            publishersWithoutId,
        );
    }
}
