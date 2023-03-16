import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { DocEditComponent } from './feature/doc/doc-edit/doc-edit.component';
import { DocComponent } from './feature/doc/doc.component';
import { BookEditComponent } from './feature/book/book-edit/book-edit.component';
import { BookComponent } from './feature/book/book.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './feature/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeHeaderComponent } from './shared/components/home-header/home-header.component';
import { HomeFooterComponent } from './shared/components/home-footer/home-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeContentComponent } from './shared/components/home-content/home-content.component';
import { MaterialModule } from './material/material.module';
import { BookListComponent } from './shared/components/book-list/book-list.component';
import { BookListCardComponent } from './shared/components/book-list-card/book-list-card.component';
import { PageEditComponent } from './feature/page/page-edit/page-edit.component';
import { PageComponent } from './feature/page/page.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { PageTreeComponent } from './shared/components/page-tree/page-tree.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EditComponent } from './feature/edit/edit.component';
import { PagePickerDirective } from './shared/components/page-tree/page-picker.directive'
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,

    // home
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,

    // book
    BookEditComponent,
    BookComponent,

    // doc
    DocEditComponent,
    DocComponent,
    TestComponent,
    HomeContentComponent,
    BookListComponent,
    BookListCardComponent,
    PageEditComponent,
    PageComponent,
    PaginatorComponent,
    PageTreeComponent,
    FooterComponent,
    EditComponent,
    PagePickerDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
