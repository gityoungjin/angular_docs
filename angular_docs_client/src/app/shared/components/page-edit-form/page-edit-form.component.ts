import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

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
  selector: 'app-page-edit-form',
  templateUrl: './page-edit-form.component.html',
  styleUrls: ['./page-edit-form.component.scss']
})
export class PageEditFormComponent {

  @Input()
  page!: Page;

  @Input()
  book!: Book;

  @Input()
  pageSubject: Subject<Page> = new Subject<Page>();

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router){ }

  save() {
    const pageId = this.route.snapshot.paramMap.get("id");

    const updatePage = {
      title: this.page.title,
      content: this.page.content,
    }

    this.apiService.put<Page>(`/page/${pageId}`, updatePage).subscribe(
      (value) => this.pageSubject.next(value)
    )
  }

  delete() {
    const pageId = this.route.snapshot.paramMap.get("id");

    this.apiService.delete<Page>(`/page/${pageId}`).subscribe(
      () => this.router.navigate(['edit/book', this.book._id])
    )
  }

}
