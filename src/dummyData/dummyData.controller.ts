import { Body, Controller, Post } from '@nestjs/common';
import getDummyData, { type DummyDataParams } from './dummyData';
import { AuthorService } from '../services/author.service';
import type { Author, Book, Publisher } from '../types/book';
import { BookService } from '../services/book.service';
import { PublisherService } from '../services/publisher.service';

@Controller('/dummy-data')
export class DummyDataController {
    constructor(
        private readonly authorService: AuthorService,
        private readonly bookService: BookService,
        private readonly publisherService: PublisherService,
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
