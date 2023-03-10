import { Component, Input } from '@angular/core';
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
  constructor(private bookService: BookApiService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    // this.bookService.searchTitle$.subscribe(searchTitle => {
      this.bookService.getBooks('').subscribe(books => {
        this.books = books;
      });
    // });
  }

  pageChanged(books: Book[]) {
    this.displayedBooks = books;
  }

}
