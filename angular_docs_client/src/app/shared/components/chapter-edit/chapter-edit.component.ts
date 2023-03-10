import { Observable, Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.scss']
})
export class ChapterEditComponent {

  @Input()
  chapters!: any;

  @Input()
  book!: any;

  createDoc() {

  }

  // book: any;
  // chapters$!: Observable<any>;
  // chaptersSubject: Subject<any> = new Subject<any>();
  // bookId: string | null;

  // constructor(private apiService: ApiService, private route: ActivatedRoute) {
  //   this.bookId = this.route.snapshot.paramMap.get("id");
  // }

  // ngOnInit(): void {
  //   this.loadData();

  //   this.apiService.get(`/book/${this.bookId}`).subscribe(
  //     data => this.book = data
  //   )
  // }

  // loadData() {
  //   this.chapters$ = this.apiService.get(`/chapter/${this.bookId}`);

  //   this.chaptersSubject.subscribe(
  //     () => this.loadData()
  //   )
  // }

  // createDoc(){
  //   this.apiService.post("/chapter/new", {_id: this.bookId}).subscribe(
  //     (value) => this.chaptersSubject.next(value)
  //   )
  // }

}
