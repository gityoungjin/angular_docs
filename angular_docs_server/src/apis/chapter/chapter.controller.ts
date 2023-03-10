import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateChapterDto, UpdateChapterDto } from "src/dto/chapter.dto";
import { ChapterService } from "./chapter.service";

@Controller("chapter")
export class ChapterController {

  constructor(
    private chapterService: ChapterService,
  ){}

  @Public()
  @Get("/:id")
  async selectChapterList(@Param("id") _id: string): Promise<any []> {
    return this.chapterService.selectChapterList(_id);
  }
  
  @Public()
  @Get("/:id")
  async selectChapterDetail(@Param("id") _id: string) : Promise<any> {
    return this.chapterService.selectChapterDetail(_id);
  }

  @Public()
  @Post("/new")
  async craeteNewChapter(@Body("_id") _id: string): Promise<any> {
    return this.chapterService.createNewChapter(_id);
  }

  @Public()
  @Post()
  async insertChapter(@Body() dto: CreateChapterDto): Promise<any> {
    return this.chapterService.insertChapter(dto);
  }

  @Public()
  @Put("/:id")
  async updateChapter(@Body() dto: UpdateChapterDto, @Param("id") _id: string) : Promise<any> {
    return this.chapterService.updateChapter(_id, dto);
  }

  @Public()
  @Delete("/:id")
  async deleteChapter(@Param("id") _id: string) : Promise<any> {
    return this.chapterService.deleteChapter(_id);
  }

}