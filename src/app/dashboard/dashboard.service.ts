import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { map, tap, last, first } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, ReplaySubject } from 'rxjs';

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

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `henter snmp resultater`;

      case HttpEventType.DownloadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `Hentet`;

      default:
        return `tror noe gikk galt: ${event.type}.`;
    }
  }

}
