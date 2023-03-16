
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookApiService } from 'src/app/core/services/book-api.service';
import { Book } from '../../interfaces/book';

interface SearchOptions {
  title?: boolean;
  owner?: boolean;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books$: Observable<Book[]> = of([]);
  displayedBooks$: Observable<Book[]> = of([]);

  @Input() searchOptions?: SearchOptions = {
    title: false,
    owner: false,
  };
  constructor(private bookService: BookApiService, private cdref: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    if(this.searchOptions?.title){
      this.bookService.searchTitle$.subscribe(searchTitle => {
        this.fetchBooks(searchTitle);
      });
    }
    if(this.searchOptions?.owner){
      this.fetchBooks('');
    }else{
      this.fetchBooks('');
    }
  }

  fetchBooks(searchTitle: string) {
    this.books$ = this.bookService.getBooks(searchTitle);
  }

  pageChanged(displayedBooks: Observable<Book[]>) {
    this.displayedBooks$ = displayedBooks;
  }

  goToBookDetail(book: Book) {
    this.router.navigate(['edit/book', book._id]);
  }

}
