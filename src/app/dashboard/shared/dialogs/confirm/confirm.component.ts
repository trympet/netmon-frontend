import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  template: `
  <h1 mat-dialog-title>Add host(s) to group</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <input matInput placeholder="Group name" [(ngModel)]="groupName">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Return</button>
    <button mat-button [mat-dialog-close]="this.groupName" cdkFocusInitial>Confirm</button>
  </div>
  `
})
export class ConfirmDialog {
  groupName: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}