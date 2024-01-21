// type to be used for the body of a PATCH stock update request

import { ObjectId } from "mongodb";

// type StockUpdateType = "sale" | "restock"
export interface StockUpdateBook {
    bookId: string;
    count: number;
    // type: StockUpdateType
}
export interface StockUpdateBody {
    books: StockUpdateBook[];
}

export interface StockUpdateBookWithObjectId extends StockUpdateBook {
    _id: ObjectId;
}
