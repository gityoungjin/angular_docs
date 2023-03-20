import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  book!: any;       // book 상세정보
  pageList!: any;   // page 목록
  routeParam!: any; // 자식 라우트의 파라미터
  routePath!: any;  // 자식 라우트의 패스

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    // private dataTransferService: DataTransferService,
  ) {}

  ngOnInit(): void {

    // 자식 라우트로부터 라우트 파라미터("id") 추출
    this.route.children[0].paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    // 자식 라우트로부터 라우트 패스("path") 추출
    this.route.children[0].data.subscribe(
      (data) => this.routePath = data["path"]
    )

    // book정보와 page 목록 가져오기
    this.apiService.get<any>(`/${this.routePath == 'book' ? 'book/book-id' : 'page/page-id'}/${this.routeParam}`).subscribe(
      (value) => {
        this.book = value.book; 
        this.pageList = value.pageList;
      }
    )
  }

}
