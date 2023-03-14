import { Book } from 'src/schema/book.schema';
import { BookDocument } from './../../schema/book.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreatePageDto, UpdatePageDto } from "src/dto/page.dto";
import { Page, PageDocument } from "src/schema/page.schema";

@Injectable()
export class PageService {

  constructor(
    @InjectModel(Book.name)
    private bookModel : Model<BookDocument>,
    @InjectModel(Page.name)
    private pageModel : Model<PageDocument>,
  ) {}
  
  // page-id 로 조회
  async selectBookAndPageDataByPageId(id: string): Promise<any> {
    // 페이지 아이디로 북정보와 페이지 목록 조회
    const page = await this.pageModel.findById({_id: id, deletedAt: null});

    const book = await this.bookModel.findById({_id: page.bookId, deletedAt: null});

    // sorting 어캐하지.
    /*
      
    */
    const pageList = await this.pageModel.find({bookId: book._id, deletedAt: null}).sort({level: 1, title: 1})

    return {book, pageList};
  }

  // id에 해당하는 부모 북의 자신을 제외한 하위 페이지 목록 조회
  async selectSubPageList(id: string): Promise<any> {
    const page = await this.pageModel.findById({_id: id, deletedAt: null});
    const book = await this.bookModel.findById({_id: page.bookId, deletedAt: null});
    return await this.pageModel.find({bookId: book._id, _id:{$ne: page._id}}).sort({level:1, title: 1});
  }

  // 상세 조회
  async selectPageDetail(pageId: string): Promise<any> {
    const detail = await this.pageModel.findById({ _id: pageId, deletedAt: null });
    console.log(detail);
    return detail;
  }

  // 새로운 페이지 생성
  async createNewPage(bookId: string): Promise<any> {
    return await this.pageModel.create({
      bookId,
      title: "New Page",
      level: 1
    })
  }

  // 등록
  async insertPage(dto: CreatePageDto): Promise<any> {
    return await this.pageModel.create(dto);
  }

  // 수정
  async updatePage(pageId: string, dto: UpdatePageDto): Promise<any> {
    // parentId가 있으면 그 아이디로 검색해서 그 녀석의 레벨 +1로 수정
    const parentId = dto.parentId;
    if ( parentId ) {
      const parentPage = await this.pageModel.findById({ _id: parentId, deletedAt: null });
      const level = parentPage.level;

      dto.level = level+1;
    }
    return await this.pageModel.findByIdAndUpdate(pageId, dto);
  }

  // 삭제
  async deletePage(pageId: string): Promise<any> {
    return await this.pageModel.findByIdAndDelete(pageId);
  }

}