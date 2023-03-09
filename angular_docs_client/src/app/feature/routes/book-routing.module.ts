import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListPageComponent } from '../pages/book/list/book-list-page.component';

const routes: Routes = [
  { path: '', component: BookListPageComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookRoutingModule { }
