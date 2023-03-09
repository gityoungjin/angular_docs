import { UpdateBookDto } from './../../dto/book.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateBookDto } from "src/dto/book.dto";
import { BookService } from "./book.service";

@Controller("book")
export class BookController {

  constructor(
    private bookService: BookService,
  ){}

  @Public()
  @Get()
  async selectBookList(): Promise<any []> {
    return this.bookService.selectBookList();
  }
  
  @Public()
  @Get("/:id")
  async selectBookDetail(@Param("id") _id: string) : Promise<any> {
    return this.bookService.selectBookDetail(_id);
  }

  @Public()
  @Post()
  async insertBook(@Body() dto: CreateBookDto): Promise<any> {
    return this.bookService.insertBook(dto);
  }

  @Public()
  @Put("/:id")
  async updateBook(@Body() dto: UpdateBookDto, @Param("id") _id: string) : Promise<any> {
    return this.bookService.updateBook(_id, dto);
  }

  @Public()
  @Delete("/:id")
  async deleteBook(@Param("id") _id: string) : Promise<any> {
    return this.bookService.deleteBook(_id);
  }

}