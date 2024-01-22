import { Module, type MiddlewareConsumer, type ModuleMetadata } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppLoggerMiddleware } from './core/AppLogger';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyDataModule } from './modules/dummyData/dummyData.module';

const imports: ModuleMetadata["imports"] = [
    BooksModule,
    AuthorsModule,
    PublishersModule,
]

process.env.NODE_ENV !== 'production' && imports.push(...[
    DummyDataModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    })
]);

@Module({
    imports: imports,
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
