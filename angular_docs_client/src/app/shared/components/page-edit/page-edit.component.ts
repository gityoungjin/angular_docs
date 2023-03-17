import { DataTransferService } from './../../../shared/services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {

  page!: any;         // 페이지 상세
  pageTitle!: string; // 페이지 제목
  routeParam!: any;   // 라우트 파라미터
  subPageList!: any;  // 자신을 제외한 모든 페이지 목록 ( 부모 페이지 셀렉트박스 )

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService,
  ){ }

  ngOnInit(): void {
  
    // 라우트 파라미터가 변경될때마다 실행
    this.route.paramMap.subscribe(
      (params) => {
        // 라우트 파라미터 추출
        this.routeParam = params.get("id");
        // 자신을 제외한 페이지 목록 조회
        this.getSubPageList();
        // 페이지 상세정보 조회
        this.getPageEditData();
      }
    )

  }

  // 페이지 상세 정보 조회
  getPageEditData() {
    this.apiService.get(`/page/${this.routeParam}`).subscribe(
      (data) => {
        this.page = data;
        this.pageTitle = this.page.title;
      }
    )
  }

  // 자신을 제외한 페이지 목록 조회
  getSubPageList() {
    this.apiService.get(`/page/sub-pages/${this.routeParam}`).subscribe(
      (data) => {
        this.subPageList = data; 
        this.subPageList = [
          {
            _id: null,
            title: '없음',
          },
          ...this.subPageList,
        ]
      }
    )
  }

  // 페이지 저장
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

  // 페이지 삭제 - 하위 자식 페이지 모두 삭제
  delete() {
    this.apiService.delete(`/page/${this.page._id}`).subscribe(
      () => {
        this.router.navigateByUrl(`/edit/book/${this.page.bookId}`).then(
          () => location.reload()
        )
      }
    )
  }
  
}