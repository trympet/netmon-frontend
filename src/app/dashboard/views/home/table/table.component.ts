import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatTableDataSource } from '@angular/material'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
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
  updateSnmpString: string = 'Update SNMP'

  constructor(private dashboardService: DashboardService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'host', 'snmp'];

  getStatus(row) {
    if (!row.hasOwnProperty('snmp')) {
      return 'loading..'
    }
  }

  isExpansionDetailRow = (index, row) => {
    row.hasOwnProperty('detailRow')
  }

  public filterTable(value) {
    this.dataSource.filter.next(value.trim().toLocaleLowerCase())
  }

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

  ngOnInit() {
    this.dataSource = new TableDataSource(this.dashboardService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getHosts() {

  }


  
}
