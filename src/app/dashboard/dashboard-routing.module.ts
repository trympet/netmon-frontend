import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: 'dashboard', component:DashboardComponent, children: [
    {path: '', component: HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
