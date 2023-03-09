import { DocEditComponent } from './feature/doc/doc-edit/doc-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from './feature/book/book-edit/book-edit.component';

const routes: Routes = [
  { path: 'edit/book', component: BookEditComponent },
  { path: 'edit/doc', component: DocEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
