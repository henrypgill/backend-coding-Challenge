import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Book } from './types/book';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcome(): string {
    return this.appService.welcome();
  }

  @Get("/books")
  async getBooks(): Promise<Book[]>  {
    return await this.appService.getBooks();
  }

  @Post("/books/create")
  async createBooks(@Body() body: {books: Book[]}): Promise<Book[] | Error>{
      const createdBooks = await this.appService.createBooks(body.books);
      return createdBooks
  }


}
