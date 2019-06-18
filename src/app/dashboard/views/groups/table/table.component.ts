import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

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

  constructor(private dashboardService: DashboardService) {
    
  }

  
}
