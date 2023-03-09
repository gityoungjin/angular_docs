import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterEditComponent } from './shared/components/chapter-edit/chapter-edit.component';
import { HomeComponent } from './feature/home/home.component';
import { DocEditComponent } from './feature/doc/doc-edit/doc-edit.component';
import { DocComponent } from './feature/doc/doc.component';
import { BookEditComponent } from './feature/book/book-edit/book-edit.component';
import { BookComponent } from './feature/book/book.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './feature/test/test.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChapterEditComponent,

    // home
    HomeComponent,

    // book
    BookEditComponent,
    BookComponent,

    // doc
    DocEditComponent,
    DocComponent,
    TestComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
