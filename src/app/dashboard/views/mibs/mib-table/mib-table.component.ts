import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

export interface Mib {
  mib_id: number;
  mib_name: string;
  mib_location: string;
}
@Component({
  selector: 'mib-table',
  templateUrl: './mib-table.component.html',
  styleUrls: ['./mib-table.component.scss']
})
export class MibTableComponent implements OnInit {
  ELEMENT_DATA: Mib[]
  dataSource
  displayedColumns: String[] = ['select', 'mib_id', 'mib_name', 'mib_location'];
  selection = new SelectionModel<Mib>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() { 
    this.dashboardService.getMibs().subscribe(
      (val: Mib[]) => this.dataSource = new MatTableDataSource<Mib>(val),
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

  checkboxLabel(row?:Mib): string {
    if (!row) {
      return `${this.isAllSelected ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.mib_id + 1}`
  }

  filterTable(filter) {
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  constructor(private dashboardService: DashboardService) {
    
  }  
}
