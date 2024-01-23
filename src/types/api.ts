// type to be used for the body of a PATCH stock update request

import { ObjectId } from "mongodb";
import type { Author, Book, Publisher } from "./book";

// type StockUpdateType = "sale" | "restock"
export interface StockUpdateBook {
    bookId: string;
    count: number;
    // type: StockUpdateType
}
export interface PATCH_UpdateStockCount {
    books: StockUpdateBook[];
}

export interface StockUpdateBookWithObjectId extends StockUpdateBook {
    _id: ObjectId;
}

export interface POST_CreateBookBody {
    books: Book[];
}
export interface POST_CreateAuthorBody {
    authors: Author[];
}
export interface POST_CreatePublisherBody {
    publishers: Publisher[];
}
