import { Page, PageSchema } from 'src/schema/page.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {};