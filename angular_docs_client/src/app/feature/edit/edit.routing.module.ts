import { PageEditComponent } from './../page/page-edit/page-edit.component';
import { BookEditComponent } from './../book/book-edit/book-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'book/:id', data: {path: "book"}, component: BookEditComponent },
  { path: 'page/:id', data: {path: "page"}, component: PageEditComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EditRoutingModule { }
