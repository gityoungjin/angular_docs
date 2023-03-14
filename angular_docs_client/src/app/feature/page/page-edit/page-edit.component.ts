import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  routeParam!: any;
  page!: any;
  subPageList!: any;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService,
  ){}

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(
      (params) => {
        this.routeParam = params.get("id");
        this.getSubPageList();
        this.getPageEditData();
      }
    )

  }

  getPageEditData() {
    this.apiService.get(`/page/${this.routeParam}`).subscribe(
      (data) => this.page = data
    )
  }

  getSubPageList() {
    this.apiService.get(`/page/sub-pages/${this.routeParam}`).subscribe(
      (data) => {this.subPageList = data;}
    )
  }

  save() {
    const formData = {
      title: this.page.title,
      content: this.page.content,
      parentId: this.page.parentId,
    }
    this.apiService.put(`/page/${this.page._id}`, formData).subscribe(
      () => location.reload()
      // () => this.dataTransferService.transferData({...formData, _id: this.page._id})
    )
  }

  delete() {
    this.apiService.delete(`/page/${this.page._id}`).subscribe(
      () => {
        this.router.navigateByUrl(`/edit/book/${this.page.bookId}`).then(
          () => location.reload()
        )
      }
    )
  }

  // book!: Book;
  // page!: Page;
  // pages$!: Observable<Page []>;
  // pageSubject: Subject<Page> = new Subject<Page>();

  // constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router){ }

  // ngOnInit(): void {
  //   this.route.params.subscribe(
  //     params => {
  //       const routeId = params["id"];
  //       this.getPageData(routeId);
  //     }
  //   )
  // }

  // getPageData(pageId: string) {
  //   this.apiService.get<Page>(`/page/${pageId}`).subscribe(
  //     data => {
  //       this.page = data;
  //       this.getBookData(data.bookId);
  //       this.loadData(data.bookId);
  //     }
  //   ) 
  // }

  // // page - book-id로 book 상세 조회
  // getBookData(bookId: string) {
  //   this.apiService.get<Book>(`/book/${bookId}`).subscribe(
  //     data => this.book = data
  //   )
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
  //   this.apiService.post<Page>("/page/new", {bookId}).subscribe(
  //     value => this.pageSubject.next(value)
  //   )
  // }

}