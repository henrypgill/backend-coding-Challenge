import { Injectable } from "@nestjs/common";
import type { Author, Book, Publisher } from "../../types/book";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export interface DummyData {
    books: Book[];
    authors: Author[];
    publishers: Publisher[];
}

export type DummyDataParams = {
    bookCount: number;
    authorCount: number;
    publisherCount: number;
};

@Injectable()
export class DummyDataService {
    getDummyData({
        bookCount,
        authorCount,
        publisherCount,
    }: DummyDataParams): DummyData {
        const authors = this.getDummyAuthors(authorCount);
        const publishers = this.getDummyPublishers(publisherCount);
        const books = this.getDummyBooks(
            bookCount,
            authors.map((a) => a._id),
            publishers.map((p) => p._id),
        );
        return {
            books,
            authors,
            publishers,
        };
    }

    getDummyBooks(
        count: number,
        author_ids: ObjectId[],
        publisherIds: ObjectId[],
    ): Required<Book>[] {
        const getRandomPublisherId = () => {
            const index = Math.floor(Math.random() * publisherIds.length);
            return author_ids[index].toString();
        };

        const getRandomAuthorIds = () => {
            const a_ids = [];
            const count = Math.floor(Math.random() * 5);
            for (let i = 0; i < count; i++) {
                const index = Math.floor(Math.random() * author_ids.length);
                a_ids.push(author_ids[index].toString());
            }

            return a_ids;
        };

        const getDummyBook = (): Required<Book> => {
            return {
                _id: new ObjectId(),
                title: faker.lorem.words({ min: 1, max: 5 }),
                author_ids: getRandomAuthorIds(),
                publisherId: getRandomPublisherId(),
                pageCount: faker.number.int({ min: 50, max: 5000 }),
                edition: faker.number.int({ min: 1, max: 99 }),
                publishYear: faker.number.int({ min: 1, max: 2024 }),
                stockCount: faker.number.int({ min: 1, max: 999 }),
            };
        };
        const books: Required<Book>[] = [];
        for (let i = 0; i < count; i++) {
            books.push(getDummyBook());
        }
        return books;
    }

    getDummyAuthors(count: number): Required<Author>[] {
        const getDummyAuthor = (): Required<Author> => {
            return {
                _id: new ObjectId(),
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            };
        };

        const authors: Required<Author>[] = [];
        for (let i = 0; i < count; i++) {
            authors.push(getDummyAuthor());
        }
        return authors;
    }

    getDummyPublishers(count: number): Required<Publisher>[] {
        const getDummyAuthor = (): Required<Publisher> => {
            return {
                _id: new ObjectId(),
                name: faker.company.name(),
                location: faker.location.country(),
            };
        };

        const publishers: Required<Publisher>[] = [];
        for (let i = 0; i < count; i++) {
            publishers.push(getDummyAuthor());
        }
        return publishers;
    }
}
