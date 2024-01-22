import { Controller } from "@nestjs/common";
import { PublishersService } from "./publishers.service";

@Controller()
export class PublishersController {
    constructor(private readonly publisherService: PublishersService) {}
}
