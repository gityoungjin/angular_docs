import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  // book
  title!: string;
  description!: string;
  bookId!: string | null;

  book: any;
  chapters$!: Observable<any>;
  chaptersSubject: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService, private route: ActivatedRoute){
    this.bookId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.loadData();

    this.apiService.get(`/book/${this.bookId}`).subscribe(
      data => this.book = data
    )
  }

  loadData() {
    this.chapters$ = this.apiService.get(`/chapter/${this.bookId}`);

    this.chaptersSubject.subscribe(
      () => this.loadData()
    )
  }

}