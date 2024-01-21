import { Module, type MiddlewareConsumer } from '@nestjs/common';
import { AppLoggerMiddleware } from './core/AppLogger';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DummyDataController } from './dummyData/dummyData.controller';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';
import { PublisherService } from './services/publisher.service';
import { DummyDataModule } from './dummyData/dummyData.module';

@Module({
    imports: [DummyDataModule],
    controllers: [AppController, DummyDataController],
    providers: [AppService, BookService, AuthorService, PublisherService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
