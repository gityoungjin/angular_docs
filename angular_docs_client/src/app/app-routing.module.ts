import { SignupComponent } from './shared/components/signup/signup.component';
import { ViewComponent } from './feature/view/view.component';
import { EditComponent } from './feature/edit/edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { SigninComponent } from './shared/components/sign-in/signin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, loadChildren: () => import("./feature/home/home.routing.module").then((m) => m.HomeRoutingModule) },
  { path: 'view', component: ViewComponent, loadChildren: () => import("./feature/view/view.routing.module").then((m) => m.ViewRoutingModule)},
  { path: 'edit', component: EditComponent, loadChildren: () => import("./feature/edit/edit.routing.module").then((m) => m.EditRoutingModule)},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
