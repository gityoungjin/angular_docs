import { Controller } from "@nestjs/common";
import { BookService } from "./book.service";

@Controller("book")
export class BookController {

  constructor(
    private bookService: BookService,
  ){}

  // 목록 조회

  // 상세 조회

  // 등록

  // 수정

  // 삭제

}