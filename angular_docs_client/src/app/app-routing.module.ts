import { EditComponent } from './feature/edit/edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', component: EditComponent, loadChildren: () => import("./feature/edit/edit.routing.module").then((m) => m.EditRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
