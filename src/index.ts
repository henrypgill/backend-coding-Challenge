import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupMongoClient } from "./core/mongoSetup";

const db_uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database:27017`; ///${process.env.MONGODB_DATABASE}`
export const database = setupMongoClient(db_uri);

async function connectToDatabase() {
    try {
        console.log("connecting to database");
        await database.client.connect();
        console.log("successfully connected to database");
    } catch (error) {
        console.log(error);
    }
}

async function bootstrap() {
    const port = process.env.PORT || 4000;
    console.log("Starting up NestJS server on port: " + port);
    const app = await NestFactory.create(AppModule, {
        snapshot: true,
    });
    await app.listen(port);
    console.log("App listening on port: " + port);
}

await connectToDatabase();
await bootstrap();
