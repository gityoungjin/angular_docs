import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable, Subject } from 'rxjs';
import { Component } from '@angular/core';

interface Book {
  _id: String;
  title: String;
  description: String;
  author: String;
  rating: Number;
  createdAt: Date;
  updatedAt: Date;
}

interface Page {
  _id: string;
  bookId: string;
  parentId: string;
  title: string;
  content: string;
  order: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  pages$!: Observable<Page []>;
  pageSubject: Subject<Book> = new Subject<Book>();

  constructor(private apiService: ApiService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    
    this.loadData("640983bb52476b4432df5e55");
  }

  loadData(bookId: string | null) {
    this.pages$ = this.apiService.get(`/page/book-id/${bookId}`);

    this.pageSubject.subscribe(
      () => this.loadData(bookId)
    )
  }

}
