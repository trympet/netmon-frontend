import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // for material
import { DashboardModule } from './dashboard/dashboard.module';

/* test */
import { MatTabsModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    DashboardRoutingModule,
    AppRoutingModule,

    MatSidenavModule,

    LayoutModule,

    MatToolbarModule,

    MatButtonModule,

    MatIconModule,

    MatListModule,

    MatTableModule,

    MatPaginatorModule,

    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
