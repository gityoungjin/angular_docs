import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Chapter, ChapterSchema } from 'src/schema/chapter.schema';
import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {};