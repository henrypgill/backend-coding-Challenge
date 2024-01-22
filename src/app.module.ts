import { Module, type MiddlewareConsumer } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppLoggerMiddleware } from './core/AppLogger';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        DevtoolsModule.register({
          http: true
        }),
        BooksModule,
        AuthorsModule,
        PublishersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
