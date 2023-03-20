import { PageViewComponent } from './../../shared/components/page-view/page-view.component';
import { BookViewComponent } from './../../shared/components/book-view/book-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'book/:id', data: {path: "book"}, component: BookViewComponent },
  { path: 'page/:id', data: {path: "page"}, component: PageViewComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
