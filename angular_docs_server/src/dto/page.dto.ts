import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { IsObjectId } from "src/common/decorators/is-object-id.decorator";

export class CreatePageDto{

  @IsObjectId()
  bookId: mongoose.Schema.Types.ObjectId;

  @IsObjectId()
  @IsOptional()
  parentId: mongoose.Schema.Types.ObjectId;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  level: number;

  createdAt: Date;
  
  updatedAt: Date;

  deletedAt: Date;

}

export class UpdatePageDto extends PartialType(CreatePageDto){}