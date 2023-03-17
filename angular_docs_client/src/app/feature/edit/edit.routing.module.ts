import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from 'src/app/shared/components/book-edit/book-edit.component';
import { PageEditComponent } from 'src/app/shared/components/page-edit/page-edit.component';

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
