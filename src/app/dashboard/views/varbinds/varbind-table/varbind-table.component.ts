import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

export interface Varbind {
  varbind_id: number;
  mib: string;
  mib_variable: string;
  location: string;
}

@Component({
  selector: 'app-varbind-table',
  templateUrl: './varbind-table.component.html',
  styleUrls: ['./varbind-table.component.scss']
})
export class VarbindTableComponent implements OnInit {

  ELEMENT_DATA: Varbind[]
  dataSource
  displayedColumns: String[] = ['select', 'varbind_id', 'mib', 'mib_variable'];
  selection = new SelectionModel<Varbind>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() { 
    this.dashboardService.getVarbinds().subscribe(
      (val: Varbind[]) => this.dataSource = new MatTableDataSource<Varbind>(val),
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

  checkboxLabel(row?:Varbind): string {
    if (!row) {
      return `${this.isAllSelected ? 'select' : 'deselect'} all`
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.varbind_id + 1}`
  }

  filterTable(filter) {
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  constructor(private dashboardService: DashboardService) {
    
  }  
}

