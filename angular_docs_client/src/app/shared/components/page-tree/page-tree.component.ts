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

}
