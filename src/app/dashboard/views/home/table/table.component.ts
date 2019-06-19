import { animate, state, style, transition, trigger } from '@angular/animations';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableDataSource, TableItem } from './table-datasource';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({ height: '*', visibility:'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<TableItem>;
  dataSource: TableDataSource;
  selection = new SelectionModel<TableItem>(true, []);
  updateSnmpString: string = 'Update SNMP'

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'host', 'snmp'];

  /** returns loading if tableitem dosent have snmp data */
  getStatus(row) {
    if (!row.hasOwnProperty('snmp')) {
      return 'loading..'
    }
  }

  /** Checks if row can be expanded */
  isExpansionDetailRow = (index, row) => {
    row.hasOwnProperty('detailRow')
  }

  /** Filters table data */
  public filterTable(value) {
    this.dataSource.filter.next(value.trim().toLocaleLowerCase())
  }

  /** Updates SNMP data */
  updateSnmp() {
    this.dashboardService.getUpdateSnmp().subscribe( 
      val => this.updateSnmpString = val ? 'Loading...' : 'Update SNMP',
      err => this.updateSnmpString = 'Error, try again.',
      () => {
        this.updateSnmpString = 'Update SNMP';
        this.dashboardService.updateSnmpResult()
      }
      )
  }

  isSelected() {
    return this.selection.selected.length
  }

  sortBySelected() {
    this.selection.selected.forEach(row => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(row),1)
      this.dataSource.data.unshift(row)
      this.dataSource.sort.sortChange.emit()
    })
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

  checkboxLabel(row?:TableItem): string {
    if (!row) {
      return `${this.isAllSelected ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.host_id + 1}`
  }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.dashboardService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    
  }

  /** Adds selected hosts to group */
  openDialog():void {
    const dialogRef = this.dialog.open(AddToGroupDialog, {
      width: '250px',
      data: {groups: this.dashboardService.getGroups()}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.dashboardService.addHostToGroup(result, this.selection.selected).subscribe()
      }
    });
  }


  
}

@Component({
  selector: 'add-to-group-dialog',
  template: `
  <h1 mat-dialog-title>Add host(s) to group</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <mat-label>Group</mat-label>
      <mat-select [(value)]="data.selectedGroup">
        <mat-option *ngFor="let group of groups" [value]="group.group_id">group: {{ group.group_name }}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Return</button>
    <button mat-button [mat-dialog-close]="data.selectedGroup" cdkFocusInitial>Confirm</button>
  </div>
  `
})
export class AddToGroupDialog {
  groups
  constructor(
    public dialogRef: MatDialogRef<AddToGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data.groups.subscribe( val => this.groups = val )
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
