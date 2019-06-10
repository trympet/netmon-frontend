import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { DashboardService } from '../../dashboard.service';
import { count, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { } 

  ngOnInit() {
    /* DRAWS DONUT GRAPH */
    this.dashboardService.getSnmpResult().pipe(
      // returns scalars of devices that are up/down
      // from SNMP data
      map((x: Array<any>) => { 
        return {'up': x.length, 'down': x.filter(val => val.data[0].error === true).length } 
      })
    ).subscribe( val => {
        // draws donut graph when SNMP data updates
        let devicesDown = val.down;
        let devicesUp = val.up;
        const chartOptions = {
          type: 'doughnut',
          data: {
            labels: ['Up', 'Down'],
            datasets: [{
              label: 'Device status',
              data: [devicesUp, devicesDown],
              backgroundColor: ['#36a2eb', '#ff6384'],
    
            }],
          }
        }
        let ctx = document.querySelector('.test');
        new Chart(ctx, chartOptions)
        },
      err => console.log(err),    
    )
  }



}
