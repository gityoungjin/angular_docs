import { ApiService } from './../../../core/services/api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent {

  @Input()
  book!: any;

  @Input()
  pageList!: any;

  constructor(private apiService: ApiService) {}

  createPage() {
    this.apiService.post(`/page/new`, {bookId: this.book._id}).subscribe(
      (data:any) => {
        this.pageList.push(data)
      }
    )
  }

}
