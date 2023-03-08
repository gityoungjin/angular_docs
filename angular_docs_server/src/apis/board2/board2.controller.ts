import { CreateBoard2Dto, UpdateBoard2Dto } from './../../dto/board2.dto';
import { Public } from './../../common/decorators/public.decorator';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Board2Service } from "./board2.service";

@Controller("board2")
export class Board2Controller {

    constructor(
        private board2Service: Board2Service,
    ){}

    @Public()
    @Get()
    async selectBoard2List(): Promise<any []> {
      return this.board2Service.selectBoard2List();
    }

    @Public()
    @Post()
    async createBoard2(@Body() data: CreateBoard2Dto): Promise<any> {
      return this.board2Service.createBoard2(data);
    }

    @Public()
    @Get("/:id")
    async selectBoard2Detail(@Param("id") _id: string) : Promise<any> {
      return this.board2Service.selectBoard2Detail(_id);
    }

    @Public()
    @Put("/:id")
    async updateBoard2(@Body() data: UpdateBoard2Dto, @Param("id") _id: string) : Promise<any> {
      return this.board2Service.updateBoard2(_id, data);
    }

    @Public()
    @Delete("/:id")
    async deleteBoard2(@Param("id") _id: string) : Promise<any> {
      return this.board2Service.deleteBoard2(_id);
    }

}