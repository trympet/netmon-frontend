import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { GroupsComponent } from './views/groups/groups.component';

const routes: Routes = [
  {path: '', component:DashboardComponent, children: [
    {path: 'groups', component: GroupsComponent},
    {path: 'dashboard', component: HomeComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
