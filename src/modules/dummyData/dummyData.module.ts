import { Module } from "@nestjs/common";
import { AuthorsService } from "../authors/authors.service";
import { BooksService } from "../books/books.service";
import { PublishersService } from "../publishers/publishers.service";
import { DummyDataController } from "./dummyData.controller";

@Module({
    imports: [],
    controllers: [DummyDataController],
    providers: [
        DummyDataService
    ],
})
export class DummyDataModule {}
