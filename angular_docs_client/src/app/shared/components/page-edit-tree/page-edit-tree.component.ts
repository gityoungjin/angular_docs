import { ApiService } from '../../../core/services/api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-edit-tree',
  templateUrl: './page-edit-tree.component.html',
  styleUrls: ['./page-edit-tree.component.scss']
})
export class PageEditTreeComponent {

  @Input()
  book!: any;

  @Input()
  pageList!: any;

  constructor(private apiService: ApiService) {}

  // 새로운 페이지 추가
  createPage() {
    this.apiService.post(`/page/new`, {bookId: this.book._id}).subscribe(
      (data:any) => {
        this.pageList.push(data)
      }
    )
  }

}
