import { Module, type MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './core/AppLogger';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
      consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }}
