import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent<T> {
  @Input() datas: Observable<T[]> = of([]);
  datasArray: T[] = [];
  @Input() pageSizeOptions: number[] = [];
  length = 0;
  pageSize = 5;
  pageIndex = 0;

  hidePageSize = false;
  @Input() showPageSizeOptions: boolean = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent?: PageEvent;


  @Output() pageChanged = new EventEmitter<Observable<T[]>>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas']) {
      this.datas.subscribe(datas => {
        this.datasArray = datas;
        this.handlePageEvent({
          length: this.datasArray.length,
          pageSize: this.pageSizeOptions[0],
          pageIndex: 0,
        })
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    let displayedDatas = this.datasArray.slice(e.pageIndex * e.pageSize, (e.pageIndex + 1) * e.pageSize);
    this.pageChanged.emit(of(displayedDatas));

  }
}
