import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

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

    // this.dataTransferService.currentData.subscribe(
    //   (data) => {
    //     const changedData = this.pageList?.map((ele:any) => {
    //       if ( ele._id == data._id ) {
    //         ele.title = data.title
    //       }
    //       return ele;
    //     })
    //     this.pageList = changedData
    //   }
    // )
  }

}
