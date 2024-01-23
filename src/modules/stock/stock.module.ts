import { Module } from "@nestjs/common";
import { StockGateway } from "./stock.gateway";
import { StockService } from "./stock.service";

@Module({
    imports: [],
    controllers: [],
    providers: [StockGateway, StockService],
    exports: [StockGateway, StockService],
})
export class StockModule {}
