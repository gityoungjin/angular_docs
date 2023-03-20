import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeHeaderComponent } from './shared/components/home-header/home-header.component';
import { HomeFooterComponent } from './shared/components/home-footer/home-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeContentComponent } from './shared/components/home-content/home-content.component';
import { MaterialModule } from './material/material.module';
import { BookListComponent } from './shared/components/book-list/book-list.component';
import { BookListCardComponent } from './shared/components/book-list-card/book-list-card.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { PageEditTreeComponent } from './shared/components/page-edit-tree/page-edit-tree.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EditComponent } from './feature/edit/edit.component';
import { QuillModule } from 'ngx-quill';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';
import { TextareaComponent } from './shared/components/textarea/textarea.component';
import { SelectComponent } from './shared/components/select/select.component';
import { BookEditComponent } from './shared/components/book-edit/book-edit.component';
import { PageEditComponent } from './shared/components/page-edit/page-edit.component';
import { ViewComponent } from './feature/view/view.component';
import { PageViewComponent } from './shared/components/page-view/page-view.component';
import { BookViewComponent } from './shared/components/book-view/book-view.component';
import { PageViewTreeComponent } from './shared/components/page-view-tree/page-view-tree.component';
import { PageTreePickerDirective } from './shared/directives/page-tree-picker.directive';
import { CommonModule, registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    // ______________________________________________________feature
    HomeComponent,
    EditComponent,
    ViewComponent,
    // ______________________________________________________feature
    // ______________________________________________________shared
    // home
    HomeContentComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    
    // book
    BookEditComponent,
    BookListComponent,
    BookListCardComponent,
    
    // page
    PageEditComponent,
    PageEditTreeComponent,
    PageViewTreeComponent,
    
    // layout
    FooterComponent,
    
    // etc
    ButtonComponent,
    InputTextComponent,
    TextareaComponent,
    SelectComponent,
    PaginatorComponent,
    
    // pipe
    EllipsisPipe,
    
    // directive
    PageTreePickerDirective,
    PageViewComponent,
    BookViewComponent,
    // ______________________________________________________shared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
