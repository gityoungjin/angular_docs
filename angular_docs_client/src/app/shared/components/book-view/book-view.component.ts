import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  
  book!: any;       // book 상세
  routeParam!: any; // 라우트 파라미터

  constructor(private apiService: ApiService, private route: ActivatedRoute){}

  ngOnInit(): void {

    // 라우트 파라미터 추출
    this.route.paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    // 북정보 조회
    this.apiService.get(`/book/${this.routeParam}`).subscribe(
      (value) => this.book = value
    )
    
  }

}
