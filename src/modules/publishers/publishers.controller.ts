import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ObjectId } from "mongodb";
import type { POST_CreatePublisherBody } from "../../types/api";
import type { Publisher } from "../../types/book";
import { PublishersService } from "./publishers.service";

@Controller("publishers")
export class PublishersController {
    constructor(private readonly publisherService: PublishersService) {}

    @Get("/")
    async getAllPublishers(): Promise<Publisher[]> {
        return await this.publisherService.getPublishers();
    }

    @Get("/id")
    async getPublishersById(
        @Query("ids") idString: string,
    ): Promise<Publisher[]> {
        const publisherIds: ObjectId[] = idString
            .split(",")
            .map((id) => new ObjectId(id));
        return await this.publisherService.getPublishersById(publisherIds);
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
