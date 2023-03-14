import { Page } from 'src/schema/page.schema';
import { CreateBookDto, UpdateBookDto } from './../../dto/book.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schema/book.schema';
import { PageDocument } from 'src/schema/page.schema';

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book.name)
    private bookModel : Model<BookDocument>,
    @InjectModel(Page.name)
    private pageModel : Model<PageDocument>,
  ) {}

  // 목록 조회
  async selectBookList(title): Promise<any[]> {
    const list = await this.bookModel.find({ title: { 
      $regex: title, $options: 'i'
    }, deletedAt: null});
    return list;
  }

  // book-id로 조회
  async selectBookAndPageDataByBookId(id: string): Promise<any> {
    
    // 북정보
    const book = await this.bookModel.findById({_id: id, deletedAt: null});

    // 페이지 목록
    const pageList = await this.pageModel.find({bookId: book._id, deletedAt: null});

    return {book, pageList};
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

    await this.pageModel.create({
      bookId: newBook._id,
      title: "New Page",
      level: 1
    });

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