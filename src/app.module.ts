import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GBooksModule } from './googleBooks/gbooks.module';

@Module({
  imports: [GBooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
