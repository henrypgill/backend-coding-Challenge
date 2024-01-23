import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { database } from "../..";
import type { StockUpdateBook } from "../../types/api";
import type { Book } from "../../types/book";

@Injectable()
export class BooksService {
    welcome(): string {
        return "Welcome!";
    }

    async getBooks(): Promise<Book[]> {
        const bookCursor = await database.books.find();
        const books = bookCursor.toArray();
        return books;
    }

    async getBookById(bookId: ObjectId): Promise<Book | undefined> {
        const cursor = await database.books.findOne<Book>({
            _id: bookId,
        });
        return cursor ?? undefined;
    }

    async getBooksById(bookIds: ObjectId[]): Promise<Book[]> {
        const cursor = await database.books.find<Book>({
            _id: { $in: bookIds },
        });
        return cursor.toArray();
    }

    async createBooks(books: Book[]): Promise<Book[]> {
        const result = await database.books.insertMany(books);
        const insertedIds: ObjectId[] = [];
        for (let index in result.insertedIds) {
            insertedIds.push(result.insertedIds[index]);
        }

        const booksCursor = await this.getBooksById(insertedIds);
        return booksCursor;
    }

    async updateStockCount(
        updateBook: StockUpdateBook,
    ): Promise<Book | undefined> {
        const cursor = await database.books.updateOne(
            { _id: new ObjectId(updateBook.bookId) },
            { $inc: { stockCount: updateBook.count } },
        );
        if (cursor.modifiedCount === 0) {
            return undefined;
        }
        const updatedBook = await this.getBookById(
            new ObjectId(updateBook.bookId),
        );
        return updatedBook;
    }

    async updateStockCounts(books: StockUpdateBook[]): Promise<Book[]> {
        const updatedBooks = await Promise.all(
            books.map((book) => this.updateStockCount(book)),
        );

        return updatedBooks.filter((book) => book !== undefined) as Book[];
    }

    async checkStockCounts(): Promise<Book[]> {
        const cursor = await database.books.find<Book>({
            stockCount: { $lte: 5 },
        });
        return cursor.toArray();
    }

    // async updateStockCounts(books: StockUpdateBook[]): Promise<Book[]> {
    //     const updateBooks: StockUpdateBooks = {};
    //     for (let book of books) {
    //         Object.defineProperty(updateBooks, book.bookId, {
    //             value: book.count,
    //             writable: true,
    //             enumerable: true,
    //             configurable: true
    //         });
    //     }
    //     type StockUpdateBooks = { [key: string]: number };

    //     const bookObjectIds: ObjectId[] = books.map(
    //         (book) => new ObjectId(book.bookId),
    //     );

    //     const cursor = await database.books.aggregate<Book>([
    //         {
    //             $match: {
    //                 _id: {
    //                     $in: bookObjectIds,
    //                 },
    //             },
    //         },
    //         {
    //             $project: {
    //                 _id: true,
    //                 stockCount: true,
    //             },
    //         },
    //         {
    //             $addFields: {
    //                 stockCount: { $add: ["$stockCount", updateBooks["$_id"]] },
    //             },
    //         },
    //     ]);
    //     return cursor.toArray();
    // }
}
