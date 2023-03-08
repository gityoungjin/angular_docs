import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";
import { IsObjectId } from "src/common/decorators/is-object-id.decorator";

export class CreateDocDto{

  @IsObjectId()
  cateId: mongoose.Schema.Types.ObjectId;

  @IsNumber()
  order: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
  
  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
  
}

export class UpdateDocDto extends PartialType(CreateDocDto){}