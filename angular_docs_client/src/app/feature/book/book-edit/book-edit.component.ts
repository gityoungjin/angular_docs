import { ApiService } from './../../../core/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {

  constructor(private apiService: ApiService) {}

  createDoc(){
    // this.apiService.post("/chapter");
  }

}
