import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavTestComponent } from './nav-test/nav-test.component';
import { AppComponent } from './app.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ,{ enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
