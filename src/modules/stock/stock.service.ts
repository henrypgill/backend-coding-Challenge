import { Injectable } from "@nestjs/common";
import { database } from "../..";
import type { Book, BookStockCount } from "../../types/book";
import { Server } from "socket.io";

@Injectable()
export class StockService {
    public socket: Server = null!;

    welcome(): string {
        return "Welcome!";
    }

    async checkStockCounts(): Promise<Book[]> {
        const cursor = await database.books.find<Book>({
            stockCount: { $lte: 5 },
        });
        return cursor.toArray();
    }

    broadcastLowStockAlert(books: Book[]): void {
        const bookStockCounts: BookStockCount[] = books.map((book) => {
            return {
                _id: book._id,
                stockCount: book.stockCount,
                title: book.title,
            };
        });
        this.socket.emit("low stock alert", { books: bookStockCounts });
    }
}
