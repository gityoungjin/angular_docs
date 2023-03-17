
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, filter, map, distinctUntilChanged, debounceTime, combineLatest, switchMap } from 'rxjs';
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
    this.fetchBooks('');
    if (this.searchOptions?.title) {
      //1. 그냥 api요청
      // this.bookService.searchTitle$.pipe(
      //   distinctUntilChanged(),
      //   debounceTime(500) // 시간지연
      // ).subscribe(searchTitle => {
      //   this.fetchBooks(searchTitle);
      // });

      //2. combineLatest 사용해서 필터링
      const searchTitle$ = this.bookService.searchTitle$.pipe(
        map(searchTitle => searchTitle ? searchTitle.trim().toLowerCase() : ''),
        distinctUntilChanged()
      );
      // combineLatest: 소스 관찰 가능 항목 중 하나가 새 값을 방출할 때마다 각 관찰 가능 소스에서 최신 값 배열을 방출하는 새 관찰 가능 항목이 생성
      this.books$ = combineLatest([this.books$, searchTitle$]).pipe(
        map(([books, searchTitle]) => {
          console.log(books, searchTitle);
          return books.filter(book => book.title.toLowerCase().includes(searchTitle));
        })
      );
      //3. switchMap 사용해서 필터링
      // this.books$ = this.bookService.getBooks('').pipe(
      //   switchMap(books => this.bookService.searchTitle$.pipe(
      //     map(searchTitle => searchTitle ? searchTitle.trim().toLowerCase() : ''),
      //     distinctUntilChanged(),
      //     map(searchTitle => books.filter(book => book.title.toLowerCase().includes(searchTitle)))
      //   ))
      // );
    }
    if (this.searchOptions?.owner) {
      // 구현해야함
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
