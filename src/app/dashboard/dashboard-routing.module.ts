import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { GroupsComponent } from './views/groups/groups.component';
import { VarbindsComponent } from './views/varbinds/varbinds.component';
import { MibsComponent } from './views/mibs/mibs.component';
import { GroupFocusComponent } from './views/groups/group-focus/group-focus.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: 'groups', component: GroupsComponent},
    {path: 'groups/:id', component: GroupFocusComponent},
    {path: 'mibs', component: MibsComponent},
    {path: 'mibs/:id/varbinds', component: VarbindsComponent},
    {path: '', component: HomeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
