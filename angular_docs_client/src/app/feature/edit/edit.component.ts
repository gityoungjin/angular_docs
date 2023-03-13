import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

interface Book {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  // book!: Book;
  // pages$!: Observable<Page []>;
  // pageSubject: Subject<Book> = new Subject<Book>();

  // constructor(private apiService: ApiService, private route: ActivatedRoute){ }

  // ngOnInit(): void {

  //   // 라우터 파라미터로부터 book-id 추출
  //   const bookId = this.route.snapshot.paramMap.get("id");

  //   // book-id로 book 상세 조회
  //   this.apiService.get<Book>(`/book/${bookId}`).subscribe(
  //     data => this.book = data
  //   )

  //   // book-id에 해당하는 page 목록 조회
  //   this.loadData(bookId);
  // }

  // // page 로드
  // loadData(bookId: string | null) {
  //   this.pages$ = this.apiService.get(`/page/book-id/${bookId}`);

  //   this.pageSubject.subscribe(
  //     () => this.loadData(bookId)
  //   )
  // }

  // // page 추가 - 추가한 후 page를 재로드 한다.
  // createPage(bookId: string){
  //   this.apiService.post<Book>("/page/new", {bookId}).subscribe(
  //     value => this.pageSubject.next(value)
  //   )
  // }

  book!: any;
  pageList!: any;
  routeParam!: any;
  routeData!: any;
  

  constructor(private apiService: ApiService, private route: ActivatedRoute ) {}

  ngOnInit(): void {

    this.route.children[0].paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    this.route.children[0].data.subscribe(
      (data) => this.routeData = data["path"]
    )

    this.apiService.get<any>(`/${this.routeData == 'book' ? 'book/book-id' : 'page/page-id'}/${this.routeParam}`).subscribe(
      (value) => {this.book = value.book; this.pageList = value.pageList;}
    )
  }

  createPage() {
    
  }

}
