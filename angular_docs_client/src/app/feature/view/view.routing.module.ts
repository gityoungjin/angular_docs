import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', data: {path: ""}, component: HomeContentComponent },
  // { path: 'about', data: {path: "about"}, component: HomeContentComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
