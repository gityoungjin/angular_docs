import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreatePageDto, UpdatePageDto } from "src/dto/page.dto";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {

  constructor(
    private pageService: PageService,
  ){}
  
  // page-id에 해당하는 북 하위 모든 페이지 목록 조회
  @Public()
  @Get("/page-id/:id")
  async selectPageListByPageId(@Param("id") pageId: string): Promise<any []> {
    return this.pageService.selectPageListByPageId(pageId);
  }

  // book-id 하위 모든 페이지 목록 조회
  @Public()
  @Get("/book-id/:id")
  async selectPageListByBookId(@Param("id") bookId: string ): Promise<any []> {
    return this.pageService.selectPageListByBookId(bookId);
  }

  // 상세 조회
  @Public()
  @Get("/:id")
  async selectPageDetail(@Param("id") pageId: string) : Promise<any> {
    return this.pageService.selectPageDetail(pageId);
  }

  // 새로운 페이지 생성
  @Public()
  @Post("/new")
  async craeteNewPage(@Body("bookId") bookId: string): Promise<any> {
    return this.pageService.createNewPage(bookId);
  }

  // 등록
  @Public()
  @Post()
  async insertPage(@Body() dto: CreatePageDto): Promise<any> {
    return this.pageService.insertPage(dto);
  }

  // 수정
  @Public()
  @Put("/:id")
  async updatePage(@Body() dto: UpdatePageDto, @Param("id") pageId: string) : Promise<any> {
    return this.pageService.updatePage(pageId, dto);
  }

  @Public()
  @Delete("/:id")
  async deletePage(@Param("id") pageId: string) : Promise<any> {
    return this.pageService.deletePage(pageId);
  }

}