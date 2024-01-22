import { Controller } from "@nestjs/common";
import { AuthorsService } from "./authors.service";

@Controller()
export class AuthorsController {
    constructor(private readonly AuthorService: AuthorsService) {}
}
