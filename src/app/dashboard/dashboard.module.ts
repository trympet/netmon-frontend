import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './views/home/table/table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatRippleModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { RowExpandDirective } from './views/home/table/row-expand.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupsComponent } from './views/groups/groups.component';


@NgModule({
  declarations: [DashboardComponent, HomeComponent, TableComponent, RowExpandDirective, GroupsComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
