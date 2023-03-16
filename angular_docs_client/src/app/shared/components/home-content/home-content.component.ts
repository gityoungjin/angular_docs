import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { BookApiService } from 'src/app/core/services/book-api.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('searchTab', { read: ElementRef, static: true }) searchTab!: ElementRef;
  constructor(private bookService: BookApiService,private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.bookService.searchTitle$.subscribe(searchTitle => {
      // click search tab

      this.tabGroup.selectedIndex = searchTitle ? 1 : 0;
      // if (searchTitle) {
        // this.searchTab.isActive = true;
        // this.searchTab.nativeElement.click();
        // this.renderer.selectRootElement(this.searchTab.nativeElement).dispatchEvent(new Event('click'));
      // }


    });
  }

}
