import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';

/* for nav og sidenav */
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { ConfirmDialog } from './dialogs/confirm/confirm.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavComponent, ConfirmDialog],
  entryComponents: [ConfirmDialog],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    DashboardRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModule { }
