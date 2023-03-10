import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateChapterDto, UpdateChapterDto } from "src/dto/chapter.dto";
import { Chapter, ChapterDocument } from "src/schema/chapter.schema";

@Injectable()
export class ChapterService {

  constructor(
    @InjectModel(Chapter.name)
    private chapterModel : Model<ChapterDocument>,
  ) {}

    
  // 목록 조회
  async selectChapterList(_id: string): Promise<any[]> {
    const list = await this.chapterModel.find({ bookId: _id, deletedAt: null });
    console.log(list);
    return list;
  }

  // 상세 조회
  async selectChapterDetail(_id: string): Promise<any> {
    const detail = await this.chapterModel.findById({ _id, deletedAt: null});
    console.log(detail);
    return detail;
  }

  // 새로운 챕터 생성
  async createNewChapter(_id: string): Promise<any> {
    const chapters = await this.chapterModel.find({ bookId: _id, deletedAt: null, level: 1 })
    let order = 1;
    if ( chapters ) {
      order = chapters.length ? Math.max(...chapters.map(d => d.order)) : 0;
    }

    return await this.chapterModel.create({
      bookId: _id,
      title: "New Chapter",
      order: order + 1,
      level: 1
    });
  }

  // 등록
  async insertChapter(dto: CreateChapterDto): Promise<any> {
    return await this.chapterModel.create(dto);
  }

  // 수정
  async updateChapter(_id: string, dto: UpdateChapterDto): Promise<any> {
    return await this.chapterModel.findByIdAndUpdate(_id, dto);
  }

  // 삭제
  async deleteChapter(_id: string): Promise<any> {
    return await this.chapterModel.findByIdAndDelete(_id);
  }

}