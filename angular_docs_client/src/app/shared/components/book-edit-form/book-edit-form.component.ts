import { Component, Input } from '@angular/core';

interface Book {
  _id: String;
  title: String;
  description: String;
  author: String;
  rating: Number;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.scss']
})
export class BookEditFormComponent {

  @Input()
  book!: Book;
  
}
