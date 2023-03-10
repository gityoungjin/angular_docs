import { Component } from '@angular/core';
import { BookApiService } from 'src/app/core/services/book-api.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {


  constructor(
    private bookApiService: BookApiService
  ) { }

  onSearchTitleChanged(searchTitle:string) {
    this.bookApiService.setSearchTitle(searchTitle);
  }
}
