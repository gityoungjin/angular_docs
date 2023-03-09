import { Controller } from "@nestjs/common";
import { ChapterService } from "./chapter.service";

@Controller("chapter")
export class ChapterController {

  constructor(
    private chapterService: ChapterService,
  ){}

  // 목록 조회

  // 상세 조회

  // 등록

  // 수정

  // 삭제

}