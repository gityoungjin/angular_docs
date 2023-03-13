import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { BookApiService } from 'src/app/core/services/book-api.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books: Book[] = [];
  displayedBooks: Book[] = [];
  // searchOption?: {title} = {};
  constructor(private bookService: BookApiService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.bookService.searchTitle$.subscribe(searchTitle => {
      this.fetchBooks(searchTitle);
    });
  }

  fetchBooks(searchTitle: string) {
      this.bookService.getBooks(searchTitle).subscribe(books => {
        this.books = books;
        console.log(books);
        // ExpressionChangedAfterItHasBeenCheckedError 방지
        this.cdref.detectChanges();
      });
  }

  pageChanged(books: Book[]) {
    this.displayedBooks = books;
  }

}
