import { DocEditComponent } from './feature/doc/doc-edit/doc-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from './feature/book/book-edit/book-edit.component';
import { TestComponent } from './feature/test/test.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'edit/book/:id', component: BookEditComponent },
  { path: 'edit/doc/:id', component: DocEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
