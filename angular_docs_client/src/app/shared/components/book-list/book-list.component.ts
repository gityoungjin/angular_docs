
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, filter, map, distinctUntilChanged, debounceTime, combineLatest, switchMap, finalize, mergeMap, tap, concatMap } from 'rxjs';
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

  @Input() searchOptions: SearchOptions = {
    title: false,
    owner: false,
  };
  constructor(private bookService: BookApiService, private cdref: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    // this.bookService.getBooks(searchTitle).subscribe(books => {
    //   this.books = books;
    //   console.log(books);
    //   // ExpressionChangedAfterItHasBeenCheckedError 방지
    //   this.cdref.detectChanges();
    // });
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
      // combineLatest: 소스 Observable 항목 중 하나가 새 값을 방출할 때마다 각 Observable 소스에서 최신 값 배열을 방출하는 새 Observable 항목이 생성
      this.books$ = combineLatest([this.books$, searchTitle$]).pipe(
        map(([books, searchTitle]) => {
          console.log(books, searchTitle);
          return books.filter(book => book.title.toLowerCase().includes(searchTitle));
        }),
        tap(()=>console.log('combineLatest tap')),
        finalize(()=>{
          console.log("combineLatest complete");
        })
      );
      //3. switchMap 사용해서 필터링
      // switchMap: Observable을 Observable로 맵핑할때 사용

      // this.books$ = this.books$.pipe(
      //   switchMap(books => this.bookService.searchTitle$.pipe(
      //     map(searchTitle => searchTitle ? searchTitle.trim().toLowerCase() : ''),
      //     distinctUntilChanged(),
      //     map(searchTitle => books.filter(book => book.title.toLowerCase().includes(searchTitle))),
      //     tap(()=>console.log('switchMap tap')),
      //     finalize(()=>console.log('switchMap complete'))
      //   ))
      // );
    }
    if (this.searchOptions?.owner) {
      // 구현해야함
    }
  }

  ngOnDestroy(): void {
  };

  fetchBooks(searchTitle: string) {
    this.books$ = this.bookService.getBooks(searchTitle).pipe(
      finalize(()=>{
        console.log("fetchBooks complete");
      })
    );
  }

  pageChanged(displayedBooks: Observable<Book[]>) {
    this.displayedBooks$ = displayedBooks;
  }

  goToBookDetail(book: Book) {
    this.router.navigate(['edit/book', book._id]);
  }

}
