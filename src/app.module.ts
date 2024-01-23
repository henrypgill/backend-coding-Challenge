import { Module, type MiddlewareConsumer, type ModuleMetadata } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppLoggerMiddleware } from './core/AppLogger';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { DummyDataModule } from './modules/dummyData/dummyData.module';
import { PublishersModule } from './modules/publishers/publishers.module';

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
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
