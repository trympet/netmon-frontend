import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

// only permits dashboard when logged in with valid JWT
const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then( mod => mod.DashboardModule) },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 
  exports: [RouterModule]
})
export class AppRoutingModule { }
