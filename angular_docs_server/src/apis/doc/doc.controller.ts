import { Controller } from "@nestjs/common";
import { DocService } from "./doc.service";

@Controller("doc")
export class DocController {

  constructor(
    private docService: DocService,
  ){}

  // 목록 조회

  // 상세 조회

  // 등록

  // 수정

  // 삭제

}