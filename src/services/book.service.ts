import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { database } from "..";
import type { StockUpdateBook } from "../types/api";
import type { Book } from "../types/book";

@Injectable()
export class BookService {
    welcome(): string {
        return "Welcome!";
    }

    async getBooks(): Promise<Book[]> {
        const bookCursor = await database.books.find();
        const books = bookCursor.toArray();
        return books;
    }

    async getBooksById(bookIds: ObjectId[]): Promise<Book[]> {
        const cursor = await database.books.find<Book>({
            _id: { $in: bookIds },
        });
        return cursor.toArray();
    }

    async createBooks(books: Book[]): Promise<Book[]> {
        const result = await database.books.insertMany(books);
        // if (result.insertedCount !== books.length) {
        //   throw new Error("Failed to create all books.")
        // }
        const createdBookIds = result.insertedIds;
        const booksCursor = await database.books.find(createdBookIds);
        return booksCursor.toArray();
    }

    async updateStock(books: StockUpdateBook[]): Promise<Book[]> {
        // const updateBooks: StockUpdateBookWithObjectId[] = books.map((book) => {return {...book, _id: new ObjectId(book.bookId) }})

        const updateBooks: StockUpdateBooks = {};
        for (let book of books) {
            Object.defineProperty(updateBooks, book.bookId, book.count);
        }

        type StockUpdateBooks = { [key: string]: number };

        const bookObjectIds: ObjectId[] = books.map(
            (book) => new ObjectId(book.bookId),
        );

        const cursor = await database.books.aggregate<Book>([
            {
                $match: {
                    _id: {
                        $in: bookObjectIds,
                    },
                },
            },
            {
                $project: {
                    _id: true,
                    stockCount: true,
                },
            },
            {
                $addFields: {
                    stockCount: { $add: ["$stockCount", updateBooks["$_id"]] },
                },
            },
        ]);
        return cursor.toArray();
    }
}