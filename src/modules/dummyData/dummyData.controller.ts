import { Controller, Post, Body } from "@nestjs/common";
import type { Book, Author, Publisher } from "src/types/book";
import { AuthorsService } from "../authors/authors.service";
import { BooksService } from "../books/books.service";
import { PublishersService } from "../publishers/publishers.service";
import getDummyData, { type DummyDataParams } from "./dummyData";


@Controller('/dummy-data')
export class DummyDataController {
    constructor(
        private readonly authorService: AuthorsService,
        private readonly bookService: BooksService,
        private readonly publisherService: PublishersService,
        ) {}

    @Post('/populate-database')
    async populateDatabase(@Body() body: DummyDataParams): Promise<{books: Book[], authors: Author[], publishers: Publisher[]}> {
        const dummyData = getDummyData(body);

        const books = await this.bookService.createBooks(dummyData.books);
        const authors = await this.authorService.createAuthors(dummyData.authors);
        const publishers = await this.publisherService.createPublishers(dummyData.publishers);
        return {books, authors, publishers};
    }
}
