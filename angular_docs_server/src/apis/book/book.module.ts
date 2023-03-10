import { PageModule } from './../page/page.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Book, BookSchema } from 'src/schema/book.schema';

@Module({
  imports:[PageModule, MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule {};