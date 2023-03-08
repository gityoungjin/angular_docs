import { MongooseModule } from '@nestjs/mongoose';
import { Board2, Board2Schema } from '../../schema/board2.schema';
import { Module } from "@nestjs/common";
import { Board2Controller } from "./board2.controller";
import { Board2Service } from "./board2.service";

@Module({
    imports:[MongooseModule.forFeature([{ name: Board2.name, schema: Board2Schema }]),],
    controllers: [Board2Controller],
    providers: [Board2Service],
    exports: [],
})
export class Board2Module {};