import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Group {
  group_id: number;
  group_name: string;
  group_type: string;
}

@Component({
  selector: 'group-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class GroupTableComponent implements OnInit {
  ELEMENT_DATA: Group[]
  dataSource
  displayedColumns: String[] = ['select', 'group_id', 'group_name', 'group_type'];
  selection = new SelectionModel<Group>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() { 
    this.dashboardService.getGroups().subscribe(
      (val: Group[]) => this.dataSource = new MatTableDataSource<Group>(val),
      err => console.error(err),
      () => this.dataSource.paginator = this.paginator
    )
  }

  isSelected() {
    return this.selection.selected.length > 0
  }
  
  isOneSelected() {
    return this.selection.selected.length === 1
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    
  }

  checkboxLabel(row?:Group): string {
    if (!row) {
      return `${this.isAllSelected ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.group_id + 1}`
  }

  filterTable(filter) {
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  /** Adds selected hosts to group */
  openDialog():void {
    const dialogRef = this.dialog.open(NewGroupDialog, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.dashboardService.newGroup(result)
      }
    });
  }
}

@Component({
  selector: 'new-group-dialog',
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
export class NewGroupDialog {
  groupName: string;
  constructor(public dialogRef: MatDialogRef<NewGroupDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

