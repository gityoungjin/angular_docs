import { ViewComponent } from './feature/view/view.component';
import { EditComponent } from './feature/edit/edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, loadChildren: () => import("./feature/home/home.routing.module").then((m) => m.HomeRoutingModule) },
  { path: ':id', component: ViewComponent },
  { path: 'page/:id', component: ViewComponent },
  { path: 'edit', component: EditComponent, loadChildren: () => import("./feature/edit/edit.routing.module").then((m) => m.EditRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
