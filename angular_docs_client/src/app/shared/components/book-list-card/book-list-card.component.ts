import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-list-card',
  templateUrl: './book-list-card.component.html',
  styleUrls: ['./book-list-card.component.scss']
})
export class BookListCardComponent {
  @Input() book?: Book;
}
