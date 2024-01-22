import { Controller, Get } from "@nestjs/common";
import { BooksService } from "./books.service";
import type { Book } from "../../types/book";

@Controller("books")
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Get("/")
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.getBooks();
    }
}
