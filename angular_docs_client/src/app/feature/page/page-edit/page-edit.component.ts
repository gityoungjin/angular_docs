import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

interface Book {
  _id: String;
  title: String;
  description: String;
  author: String;
  rating: Number;
  createdAt: Date;
  updatedAt: Date;
}

interface Page {
  _id: string;
  bookId: string;
  parentId: string;
  title: string;
  content: string;
  order: number;
  level: number;
  createaAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  book!: Book;
  page!: Page;
  pages$!: Observable<Page []>;
  pageSubject: Subject<Book> = new Subject<Book>();

  constructor(private apiService: ApiService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const routeId = params["id"];
        this.getPageData(routeId);
      }
    )
  }

  getPageData(pageId: string) {
    this.apiService.get<Page>(`/page/${pageId}`).subscribe(
      data => {
        this.page = data;
        this.getBookData(data.bookId);
        this.loadData(data.bookId);
      }
    ) 
  }

  // page - book-id로 book 상세 조회
  getBookData(bookId: string) {
    this.apiService.get<Book>(`/book/${bookId}`).subscribe(
      data => this.book = data
    )
  }

  // page 로드
  loadData(bookId: string | null) {
    this.pages$ = this.apiService.get(`/page/book-id/${bookId}`);

    this.pageSubject.subscribe(
      () => this.loadData(bookId)
    )
  }

  // page 추가 - 추가한 후 page를 재로드 한다.
  createPage(bookId: string){
    this.apiService.post<Book>("/page/new", {bookId}).subscribe(
      value => this.pageSubject.next(value)
    )
  }

  save() {

  }

  delete() {
    
  }

}