import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { ObjectId } from "mongodb";
import type {
    PATCH_UpdateStockCount,
    POST_CreateBookBody,
} from "../../types/api";
import type { Book } from "../../types/book";
import { BooksService } from "./books.service";
import { StockGateway } from "../stock/stock.gateway";

@Controller("books")
export class BooksController {
    constructor(
        private readonly bookService: BooksService,
        private readonly stockGateway: StockGateway,
    ) {}

    @Get("/")
    async getAllBooks(): Promise<Book[]> {
        return await this.bookService.getBooks();
    }

    @Get("/id")
    async getBooksById(@Query("ids") idString: string): Promise<Book[]> {
        const bookIds: ObjectId[] = idString
            .split(",")
            .map((id) => new ObjectId(id));
        return await this.bookService.getBooksById(bookIds);
    }

    @Post("/")
    async createBooks(@Body() { books }: POST_CreateBookBody): Promise<Book[]> {
        const booksWithoutId = books.map((book) => {
            delete book._id;
            return book;
        });
        return await this.bookService.createBooks(booksWithoutId);
    }

    @Patch("/stock")
    async updateStockCounts(
        @Body() { books }: PATCH_UpdateStockCount,
    ): Promise<Book[]> {
        let updatedBooks: Book[] = [];
        if (books.length === 0) {
            return [];
        } else if (books.length === 1) {
            const book = await this.bookService.updateStockCount(books[0]);
            if (book) updatedBooks = [book];
        } else {
            updatedBooks = await this.bookService.updateStockCounts(books);
        }
        const lowStockBooks = await this.bookService.checkStockCounts();
        if (lowStockBooks.length > 0) {
            this.stockGateway.stockService.broadcastLowStockAlert(
                lowStockBooks,
            );
        }
        return updatedBooks;
    }
}
