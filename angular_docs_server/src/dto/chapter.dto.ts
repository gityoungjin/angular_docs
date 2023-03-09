import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";
import { IsObjectId } from "src/common/decorators/is-object-id.decorator";

export class CreateChapterDto{

  @IsObjectId()
  bookId: mongoose.Schema.Types.ObjectId;

  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsNumber()
  level: number;

  deletedAt: Date;

}

export class UpdateChapterDto extends PartialType(CreateChapterDto){}