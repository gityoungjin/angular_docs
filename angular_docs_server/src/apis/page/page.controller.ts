import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreatePageDto, UpdatePageDto } from "src/dto/page.dto";
import { PageService } from "./page.service";

@Controller("page")
export class PageController {

  constructor(
    private pageService: PageService,
  ){}
  
  @Public()
  @Get("/page-id/:id")
  async selectBookAndPageDataByPageId(@Param("id") id: string): Promise<any> {
    return this.pageService.selectBookAndPageDataByPageId(id);
  }

  // id에 해당하는 부모 북의 자신을 제외한 하위 페이지 목록 조회
  @Public()
  @Get("/sub-pages/:id")
  async selectSubPageList(@Param("id") id: string): Promise<any> {
    return this.pageService.selectSubPageList(id);
  }

  // id에 해당하는 상위 모든 부모 페이지 트리형식으로 조회 - 북까지 조회
  @Public()
  @Get("/tree-pages/:id")
  async selectTreePageList(@Param("id") id: string): Promise<any> {
    return this.pageService.selectTreePageList(id);
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

  // 삭제
  @Public()
  @Delete("/:id")
  async deletePage(@Param("id") pageId: string) : Promise<any> {
    console.log(2222222)
    return this.pageService.deletePage(pageId);
  }

}