import { ObjectId } from "mongodb";
import type { Book, Author, Publisher } from "../../types/book";
import { faker } from "@faker-js/faker";

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

export default function getDummyData({
    bookCount,
    authorCount,
    publisherCount,
}: DummyDataParams): DummyData {
    const authors = getDummyAuthors(authorCount);
    const publishers = getDummyPublishers(publisherCount);
    const books = getDummyBooks(
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

export function getDummyBooks(
    count: number,
    author_ids: ObjectId[],
    publisherIds: ObjectId[],
): Book[] {
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

    const getDummyBook = (): Book => {
        return {
            title: faker.lorem.words({ min: 1, max: 5 }),
            author_ids: getRandomAuthorIds(),
            publisherId: getRandomPublisherId(),
            pageCount: faker.number.int({ min: 50, max: 5000 }),
            edition: faker.number.int({ min: 1, max: 99 }),
            publishYear: faker.number.int({ min: 1, max: 2024 }),
            stockCount: faker.number.int({ min: 1, max: 999 }),
        };
    };
    const books: Book[] = [];
    for (let i = 0; i < count; i++) {
        books.push(getDummyBook());
    }
    return books;
}

export function getDummyAuthors(count: number): Author[] {
    const getDummyAuthor = (): Author => {
        return {
            _id: new ObjectId(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        };
    };

    const authors: Author[] = [];
    for (let i = 0; i < count; i++) {
        authors.push(getDummyAuthor());
    }
    return authors;
}

export function getDummyPublishers(count: number): Publisher[] {
    const getDummyAuthor = (): Publisher => {
        return {
            _id: new ObjectId(),
            name: faker.company.name(),
            location: faker.location.country(),
        };
    };

    const publishers: Publisher[] = [];
    for (let i = 0; i < count; i++) {
        publishers.push(getDummyAuthor());
    }
    return publishers;
}
