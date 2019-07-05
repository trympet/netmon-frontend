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
  /** Gets all varbinds from database */
  getAllVarbinds() {
    return this.http.get(this.apiUrl + 'varbinds')
  }
  /**
   * Gets varbinds in MIB
   * @param mibID - Id for MIB you want to get varbinds for
   */
  getVarbindsInMib(mibId:Number) {
    return this.http.post(this.apiUrl + 'varbindsinmib', {"mibId": mibId})
  }
  getMibs() {
    return this.http.get(this.apiUrl + 'mibs')
  }
  /**
   * Creates a new group
   * @param groupName Name of new group
   */
  newGroup(groupName:string) {
    return this.http.post(this.apiUrl + 'newgroup', {"groupName": groupName})
  }
  /** Adds one or more hosts to group
   * @param groupId - ID of group
   * @param device - array of devices to be added to group
   */
  addHostToGroup(groupId: number, device: TableItem[]) {
    const deviceIds = device.map( (device:TableItem) => device.host_id)
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
