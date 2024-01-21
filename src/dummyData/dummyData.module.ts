import { Module } from "@nestjs/common";
import { AuthorService } from "../services/author.service";
import { BookService } from "../services/book.service";
import { PublisherService } from "../services/publisher.service";
import { DummyDataController } from "./dummyData.controller";

@Module({
    imports: [],
    controllers: [DummyDataController],
    providers: [BookService, AuthorService, PublisherService],
})
export class DummyDataModule {}
