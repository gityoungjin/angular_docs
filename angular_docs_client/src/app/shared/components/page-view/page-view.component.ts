import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  book: any;
  page: any = {};             // 페이지 상세
  safeContent!: SafeHtml; // 내용
  routeParam!: any;           // 라우트 파라미터
  pageTree!: any;             // 현재 페이지의 부모페이지들 트리

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ){ }

  ngOnInit(): void {
    
    // 라우트 파라미터가 변경될때마다 실행
    this.route.paramMap.subscribe(
      (params) => {
        console.log(1)
        // 라우트 파라미터 추출
        this.routeParam = params.get("id");
        console.log(this.routeParam)
        this.getData();
        this.getPageTree();
      }
    )

  }

  // 페이지 상세 정보 조회
  getData() {
    this.apiService.get(`/page/${this.routeParam}`).subscribe(
      (data) => {
        this.page = data;
        // quill로 작성된 데이터를 안전하게 출력하기 위해
        if ( this.page.content ) {
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
        } else {
          this.safeContent = "";
        }
      }
    )
  }

  // 부모 페이지 및 최상위 북 조회
  getPageTree() {
    this.apiService.get(`/page/tree-pages/${this.routeParam}`).subscribe(
      (data: any) => {
        this.pageTree = data.pages;
        this.book = data.book;
      }
    )
  }

}
