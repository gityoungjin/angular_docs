import { EditPageComponent } from './feature/edit/page/components/edit-page/edit-page.component';
import { EditBookComponent } from './feature/edit/book/components/edit-book/edit-book.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'edit/book', component: EditBookComponent },
  { path: 'edit/page', component: EditPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
