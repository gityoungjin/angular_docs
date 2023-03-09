import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto{

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  author: string;
  
  @IsOptional()
  @IsNumber()
  rating: number;

  createdAt: Date;
  
  updatedAt: Date;

  deletedAt: Date;

}

export class UpdateBookDto extends PartialType(CreateBookDto){}