import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  TableComponent,
  AddToGroupDialog,
} from './views/home/table/table.component';
import { GroupTableComponent, NewGroupDialog } from './views/groups/table/table.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRippleModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
} from '@angular/material';
import { DashboardService } from './dashboard.service';
import { RowExpandDirective } from './views/home/table/row-expand.directive';
import { GroupsComponent } from './views/groups/groups.component';
import { VarbindsComponent } from './views/varbinds/varbinds.component';
import { VarbindTableComponent } from './views/varbinds/varbind-table/varbind-table.component';
import { MibsComponent } from './views/mibs/mibs.component';
import { MibTableComponent } from './views/mibs/mib-table/mib-table.component';
import { AuthRequestOptions } from '../auth/auth.service';
import { AuthErrorHandler } from '../auth/auth-error-handler';
import { GroupFocusComponent } from './views/groups/group-focus/group-focus.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    TableComponent,
    GroupTableComponent,
    RowExpandDirective,
    GroupsComponent,
    VarbindsComponent,
    AddToGroupDialog,
    NewGroupDialog,
    VarbindTableComponent,
    MibsComponent,
    MibTableComponent,
    GroupFocusComponent,
  ],
  entryComponents: [AddToGroupDialog, NewGroupDialog],
  imports: [
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    DashboardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthRequestOptions, multi: true},
    {provide: ErrorHandler, useClass: AuthErrorHandler}
  ],
})
export class DashboardModule {}
