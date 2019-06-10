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

  devicesUp: Number = 0;
  devicesDown: Number = 0;


  constructor(private dashboardService: DashboardService) { }

  
  

  ngOnInit() {

    this.dashboardService.getSnmpResult().pipe(
      map((x: Array<any>) => {return {'up': x.length, 'down': x.filter(val => val.error === true).length } })
    ).subscribe(val => {
      this.devicesDown = val.down;
      this.devicesUp = val.up;
      console.log(val);
      
    },
    err => console.log(err),
    () => {
      const chartOptions = {
        type: 'doughnut',
        data: {
          labels: ['Up', 'Down'],
          datasets: [{
            label: 'Device status',
            data: [this.devicesUp, this.devicesDown],
            backgroundColor: ['#36a2eb', '#ff6384'],
  
          }],
  
  
        }
      }
      let ctx = document.querySelector('.test');
      new Chart(ctx, chartOptions)
    }
    
    )




    
  }

}
