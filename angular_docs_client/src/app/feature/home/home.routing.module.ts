import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContentComponent } from 'src/app/shared/components/home-content/home-content.component';

const routes: Routes = [
  { path: '', data: {path: ""}, component: HomeContentComponent },
  { path: 'about', data: {path: "about"}, component: HomeContentComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
