import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent<T> {
  @Input() datas: T[] = [];
  displayedDatas: T[] = [];
  @Input() pageSizeOptions: number[] = [];
  length = 0;
  pageSize = 5;
  pageIndex = 0;

  hidePageSize = false;
  @Input() showPageSizeOptions: boolean = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent?: PageEvent;


  @Output() pageChanged = new EventEmitter<T[]>();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas']) {
      this.handlePageEvent({
        length: this.datas.length,
        pageSize: this.pageSizeOptions[0],
        pageIndex: 0,
      })
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.displayedDatas = this.datas.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
    this.pageChanged.emit(this.displayedDatas);

  }
}
