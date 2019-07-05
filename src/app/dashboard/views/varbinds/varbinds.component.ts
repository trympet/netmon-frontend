import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-varbinds',
  templateUrl: './varbinds.component.html',
  styleUrls: ['./varbinds.component.scss']
})
export class VarbindsComponent implements OnInit {
  id: Number

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.route.params.subscribe((groupId:Number) => this.id = parseInt(groupId['id']))
    this.dashboardService.getVarbindsInMib(this.id).subscribe(res => console.log(res))
    
  }

}
