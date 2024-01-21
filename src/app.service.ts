import { Injectable } from '@nestjs/common';
import { database } from '.';
import type { Book } from './types/book';

@Injectable()
export class AppService {
  welcome(): string {
    return 'Welcome!';
  }

  async getBooks(): Promise<Book[]> {
    const bookCursor = await database.books.find()
    const books = bookCursor.toArray()
    return books
  }
  async createBooks(books: Book[]): Promise<Book[]> {
    const result = await database.books.insertMany(books)
    // if (result.insertedCount !== books.length) {
    //   throw new Error("Failed to create all books.")
    // }
    const createdBookIds = result.insertedIds
    const booksCursor = await database.books.find(createdBookIds)
    return booksCursor.toArray()
  }

}
