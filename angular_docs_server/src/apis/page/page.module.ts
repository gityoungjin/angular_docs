import { Book, BookSchema } from './../../schema/book.schema';
import { Page, PageSchema } from 'src/schema/page.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [],
})
export class PageModule {};