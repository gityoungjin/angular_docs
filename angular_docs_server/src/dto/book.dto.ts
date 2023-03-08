import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

export class CreateBookDto{

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;
  
  @IsNumber()
  rating: number;

  createdAt: Date;
  
  updatedAt: Date;

  deletedAt: Date;

}

export class UpdateBookDto extends PartialType(CreateBookDto){}