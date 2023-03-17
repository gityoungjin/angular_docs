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
import { PageTreeComponent } from './shared/components/page-tree/page-tree.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EditComponent } from './feature/edit/edit.component';
import { PagePickerDirective } from './shared/components/page-tree/page-picker.directive'
import { QuillModule } from 'ngx-quill';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';
import { TextareaComponent } from './shared/components/textarea/textarea.component';
import { SelectComponent } from './shared/components/select/select.component';
import { BookEditComponent } from './shared/components/book-edit/book-edit.component';
import { PageEditComponent } from './shared/components/page-edit/page-edit.component';
import { ViewComponent } from './feature/view/view.component';

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
    PageTreeComponent,
    
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
    PagePickerDirective,  // page의 특정 컴포넌트에서만 사용하기 때문에 이곳에 둘 이유가 없음
    // ______________________________________________________shared
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
