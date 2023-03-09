import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookFormPageComponent } from './feature/pages/book/form/book-form-page.component';
import { BookListPageComponent } from './feature/pages/book/list/book-list-page.component';
import { ChapterListPageComponent } from './feature/pages/chapter/list/chapter-list-page.component';
import { HomePageComponent } from './feature/pages/home/home-page.component';
import { ChapterComponent } from './shared/components/chapter/chapter.component';
import { HomeComponent } from './feature/home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListPageComponent,
    HomePageComponent,
    ChapterListPageComponent,
    BookFormPageComponent,
    ChapterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
