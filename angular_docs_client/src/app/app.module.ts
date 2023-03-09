import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterComponent } from './shared/components/chapter/chapter.component';
import { HomeComponent } from './feature/home/home/home.component';
import { EditBookComponent } from './feature/edit/book/components/edit-book/edit-book.component';
import { EditPageComponent } from './feature/edit/page/components/edit-page/edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChapterComponent,
    HomeComponent,
    EditBookComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
