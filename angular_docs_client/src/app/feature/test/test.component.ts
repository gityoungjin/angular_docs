import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  author!: string;

  constructor(private apiService: ApiService) {}

  createNewBook() {
    this.apiService.post("/book/new", {author: this.author}).subscribe(
      () => console.log("완료")
    )
  }

}
