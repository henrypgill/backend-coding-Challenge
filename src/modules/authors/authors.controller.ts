import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import type { Author } from "../../types/book";
import { ObjectId } from "mongodb";
import type { POST_CreateAuthorBody } from "../../types/api";

@Controller("authors")
export class AuthorsController {
    constructor(private readonly AuthorsService: AuthorsService) {}

    @Get("/")
    async getAllAuthors(): Promise<Author[]> {
        return this.AuthorsService.getAuthors();
    }

    @Get("/id")
    async getAuthorsById(@Query("ids") idString: string): Promise<Author[]> {
        const authorIds: ObjectId[] = idString
            .split(",")
            .map((id) => new ObjectId(id));
        return this.AuthorsService.getAuthorsById(authorIds);
    }

    @Post("/")
    async createAuthor(
        @Body() { authors }: POST_CreateAuthorBody,
    ): Promise<Author[]> {
        const authorsWithoutId = authors.map((author) => {
            delete author._id;
            return author;
        });
        return await this.AuthorsService.createAuthors(authorsWithoutId);
    }
}
