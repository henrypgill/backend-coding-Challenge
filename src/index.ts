import { NestFactory, PartialGraphHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupMongoClient } from "./core/mongoSetup";
import * as fs from "fs";

async function connectToDatabase() {
    const db = setupMongoClient();
    try {
        console.log("connecting to database");
        await db.client.connect();
        console.log("successfully connected to database");
    } catch (error) {
        console.log(error);
    }
    return db
}
async function bootstrap() {
    try {
        const port = process.env.PORT || 4000;
        console.log("Starting up NestJS server on port: " + port);
        const app = await NestFactory.create(AppModule, {
            snapshot: true,
            abortOnError: false,
        });
        await app.listen(port);
        console.log("App listening on port: " + port);
    } catch (error) {
        fs.writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
    console.error(error);
    process.exit(1);
    }
}

console.time("Server startup time");
console.log("Starting up server.");
export const database = await connectToDatabase();
await bootstrap();
console.log("Server started up successfully.")
console.timeEnd("Server startup time");
