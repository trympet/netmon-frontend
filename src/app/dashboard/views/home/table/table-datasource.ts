import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, first, flatMap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, forkJoin } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { EventEmitter } from 'events';

// TODO: Replace this with your own data model type
interface asd {
  
}
export interface TableItem {
    host_id: number;
    name: string;
    community: string;
    snmp_version: number;
    host: string;
    port: number;
    password: null;
  // hosts: {
  //   host_id: number;
  //   name: string;
  //   community: string;
  //   snmp_version: number;
  //   host: string;
  //   port: number;
  //   password: null;
  // };
    snmp: any;
  // {
  //   hostname: string;
  //   data: {
  //     varbind: string;
  //     res: string;
  //   };
  // };

}

// TODO: replace this with real data from your application




/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  hostsObservable;
  snmpObservable;
  data: TableItem[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  testData;
  filter = new BehaviorSubject('');
  

  constructor(private dashboardService: DashboardService) {
    super(); 
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    this.hostsObservable = this.dashboardService.getHosts()
    this.snmpObservable = this.dashboardService.getSnmpResult()
    
    
    this.hostsObservable.subscribe(
      (data: TableItem[]) => this.data = data,
      err => console.error(err),
      () => {
        console.log(this.data);
        
        this.snmpObservable.subscribe((value: Array<any>) => value.map( snmpObj => {
          this.data.find(hostsObj => hostsObj.host_id === snmpObj.host_id)['snmp'] = snmpObj.data       
        })
        )
        this.paginator.page.emit()
      }
    )
      
      
      // array of 'eventlisteners' for updating data
      const dataMutations = [
      this.data,
      this.filter,
      this.paginator.page,
      this.sort.sortChange
    ];
    
        
    
        
        
    
    let fVal;
    this.filter.subscribe(val => fVal = val)
        
    return merge(...dataMutations).pipe(map(() => {
      if(fVal) {
        
        return this.getSortedData([...this.getFileredData([...this.data], fVal)])
      }
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }



  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    //this.hostsObservable.unsubscribe()
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getFileredData(data: TableItem[], value: string) {
    return data.filter( (val: TableItem) => val.name.startsWith(value))
    
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    
    
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      return compare(a[this.sort.active], b[this.sort.active], isAsc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
