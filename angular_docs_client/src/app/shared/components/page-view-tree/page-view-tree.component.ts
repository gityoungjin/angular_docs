import { ApiService } from './../../../core/services/api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-view-tree',
  templateUrl: './page-view-tree.component.html',
  styleUrls: ['./page-view-tree.component.scss']
})
export class PageViewTreeComponent {

  @Input()
  book!: any;

  @Input()
  pageList!: any;

  constructor(private apiService: ApiService) {}

}
