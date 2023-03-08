import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBoard2Dto {

    @IsString()
    title: string;
    
    @IsString()
    category: string;

    @IsString()
    description: string;

    @IsBoolean()
    isPublic: boolean;
  
    createdAt: Date;

    updatedAt: Date;
  
    deletedAt: Date;

}

export class UpdateBoard2Dto extends PartialType(CreateBoard2Dto){}