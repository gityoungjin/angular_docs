import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreatePageDto, UpdatePageDto } from "src/dto/page.dto";
import { Page, PageDocument } from "src/schema/page.schema";

@Injectable()
export class PageService {

  constructor(
    @InjectModel(Page.name)
    private pageModel : Model<PageDocument>,
  ) {}
  
  // page-id에 해당하는 북 하위 모든 페이지 목록 조회
  async selectPageListByPageId(pageId: string): Promise<any[]> {
    const page = await this.pageModel.findById({ _id: pageId });
    return await this.pageModel.find({ bookId: page.bookId, deletedAt: null })
  }

  // book-id 하위 모든 페이지 목록 조회
  async selectPageListByBookId(bookId: string): Promise<any[]> {
    return await this.pageModel.find({ bookId, deletedAt: null });
  }

  // 상세 조회
  async selectPageDetail(pageId: string): Promise<any> {
    const detail = await this.pageModel.findById({ _id: pageId, deletedAt: null });
    console.log(detail);
    return detail;
  }

  // 새로운 페이지 생성
  async createNewPage(bookId: string): Promise<any> {
    const pages = await this.pageModel.find({ bookId, deletedAt: null, level: 1 })
    let order = 1;
    if ( pages ) {
      order = pages.length ? Math.max(...pages.map(d => d.order)) : 0;
    }

    return await this.pageModel.create({
      bookId,
      title: "New Page",
      order: order + 1,
      level: 1
    });
  }

  // 등록
  async insertPage(dto: CreatePageDto): Promise<any> {
    return await this.pageModel.create(dto);
  }

  // 수정
  async updatePage(pageId: string, dto: UpdatePageDto): Promise<any> {
    return await this.pageModel.findByIdAndUpdate(pageId, dto);
  }

  // 삭제
  async deletePage(pageId: string): Promise<any> {
    return await this.pageModel.findByIdAndDelete(pageId);
  }

}