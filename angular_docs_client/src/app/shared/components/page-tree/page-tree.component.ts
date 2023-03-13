import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable, Subject } from 'rxjs';
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
  selector: 'app-page-tree',
  templateUrl: './page-tree.component.html',
  styleUrls: ['./page-tree.component.scss']
})
export class PageTreeComponent {

  @Input()
  book!: any;

  @Input()
  pageList!: any;

}
