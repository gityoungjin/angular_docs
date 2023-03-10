import { CreateBookDto, UpdateBookDto } from './../../dto/book.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from 'src/schema/book.schema';
import { ChapterService } from '../chapter/chapter.service';

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book.name)
    private bookModel : Model<BookDocument>,
    private readonly chapterService: ChapterService
  ) {}

  // 목록 조회
  async selectBookList(): Promise<any[]> {
    const list = await this.bookModel.find({ deletedAt: null });
    console.log(list);
    return list;
  }

  // 상세 조회
  async selectBookDetail(_id: string): Promise<any> {
    const detail = await this.bookModel.findById({ _id, deletedAt: null});
    console.log(detail);
    return detail;
  }

  // 새로운 북 생성
  async createNewBook(author: string): Promise<any> {
    const newBook = await this.bookModel.create({
      title: "New Book",
      author,
    });

    await this.chapterService.createNewChapter(newBook._id.toString());

    return newBook;
  }

  // 등록
  async insertBook(dto: CreateBookDto): Promise<any> {
    return await this.bookModel.create(dto);
  }

  // 수정
  async updateBook(_id: string, dto: UpdateBookDto): Promise<any> {
    return await this.bookModel.findByIdAndUpdate(_id, dto);
  }

  // 삭제
  async deleteBook(_id: string): Promise<any> {
    return await this.bookModel.findByIdAndDelete(_id);
  }

}