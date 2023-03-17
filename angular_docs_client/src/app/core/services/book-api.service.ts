import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private endpoint = '/book';
  searchTitle$ = new BehaviorSubject<string>('');
  // searchTitle$ = new Observable<string>((subscriber) => {
  //   subscriber.next('1');
  //   subscriber.next('2');
  //   subscriber.next('3');
  // });

  constructor(private apiService: ApiService) { }

  getBooks(title:string): Observable<Book[]> {
    return this.apiService.get<Book[]>(`${this.endpoint}?title=${title}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.apiService.post<Book>(this.endpoint, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.apiService.put<Book>(`${this.endpoint}/${book._id}`, book);
  }

  deleteBook(bookId: number): Observable<Book> {
    return this.apiService.delete<Book>(`${this.endpoint}/${bookId}`);
  }
  setSearchTitle(searchTitle: string) {
    this.searchTitle$.next(searchTitle);
  }
  completeSearchTitle() {
    this.searchTitle$.complete();
  }
  createSearchTitle(){
    this.searchTitle$ = new BehaviorSubject<string>('');
  }
}
