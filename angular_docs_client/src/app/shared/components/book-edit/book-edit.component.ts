import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  book!: any;       // book 상세
  routeParam!: any; // 라우트 파라미터
  bookTitle!: string; // 페이지 제목

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {

    // 라우트 파라미터 추출
    this.route.paramMap.subscribe(
      (params) => this.routeParam = params.get("id")
    )

    // 북정보 조회
    this.apiService.get(`/book/${this.routeParam}`).subscribe(
      (value) => {
        this.book = value;
        this.bookTitle = this.book.title;
      }
    )
    
  }

  // 저장
  save() {

    const formData = {
      title: this.book.title,
      description: this.book.description,
    }

    this.apiService.put(`/book/${this.book._id}`, formData).subscribe(
      () => {
        // 새로고침 ( ... )
        location.reload()
      }
      // () => this.dataTransferService.transferData({...formData, _id: this.page._id})
    )
  }

  // 책삭제
  delete() {
    if ( !confirm("책을 삭제하시겠습니까?") ) {
      return;
    }

    this.apiService.delete(`/book/${this.book._id}`).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    )
  }

}