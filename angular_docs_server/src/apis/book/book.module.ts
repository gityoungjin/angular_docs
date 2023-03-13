import { PageSchema } from './../../schema/page.schema';
import { Page } from 'src/schema/page.schema';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Book, BookSchema } from 'src/schema/book.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule {};