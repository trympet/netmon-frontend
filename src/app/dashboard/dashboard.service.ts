import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { TableItem } from './views/home/table/table-datasource';

@Injectable()
export class DashboardService {
  
  apiUrl = 'http://localhost:5000/'
  snmpResult: ReplaySubject<Object>

  constructor(private http: HttpClient) { 
    this.snmpResult = new ReplaySubject()
    this.http.get(this.apiUrl + 'snmp').subscribe(res => {
      this.snmpResult.next(res)
    })
    

  }

  getHosts() {
    return this.http.get(this.apiUrl + 'hosts')
  }
  getGroups() {
    return this.http.get(this.apiUrl + 'groups')
  }
  getVarbinds() {
    return this.http.get(this.apiUrl + 'varbinds')
  }
  getMibs() {
    return this.http.get(this.apiUrl + 'mibs')
  }
  addHostToGroup(groupId: number, device: TableItem[]) {
    const deviceIds = device.map( (device:TableItem) => device.host_id)
    console.log(deviceIds);
    
    return this.http.post(this.apiUrl + 'devicetogroup', {"hostId": deviceIds, "groupId": groupId})
    
  }
  getSnmpResult() {
    return this.snmpResult
  }
  updateSnmpResult() {
    this.http.get(this.apiUrl + 'snmp').subscribe(res => {
      this.snmpResult.next(res)
    })
  }

  getUpdateSnmp() {
    let status = new BehaviorSubject(true)
    this.http.get(this.apiUrl + 'qsnmp',).subscribe(
      () => status.next(true),
      err => console.error(err),
      () => status.complete(),
    )
    return status
  }

}
