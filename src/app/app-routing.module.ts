import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Test3Component} from "./test3/test3.component";
import {IntensiveComponent} from "./intensive/intensive.component";

const routes: Routes = [
  {
    path: 'one',
    component: Test3Component,
    children: []
  },
  {
    path: 'two',
    component: IntensiveComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
