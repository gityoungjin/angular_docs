import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Doc, DocSchema } from 'src/schema/doc.schema';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }]),],
  controllers: [DocController],
  providers: [DocService],
  exports: [],
})
export class DocModule {};