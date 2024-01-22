import { Module } from "@nestjs/common";
import { AuthorsModule } from "../authors/authors.module";
import { BooksModule } from "../books/books.module";
import { PublishersModule } from "../publishers/publishers.module";
import { DummyDataController } from "./dummyData.controller";
import { DummyDataService } from "./dummyData.service";

@Module({
    imports: [BooksModule, AuthorsModule, PublishersModule],
    controllers: [DummyDataController],
    providers: [
        DummyDataService
    ],
})
export class DummyDataModule {}
