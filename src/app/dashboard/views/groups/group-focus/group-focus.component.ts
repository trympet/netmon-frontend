import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-focus',
  templateUrl: './group-focus.component.html',
  styleUrls: ['./group-focus.component.scss']
})
export class GroupFocusComponent implements OnInit {
  id: Number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((groupId:Number) => this.id = parseInt(groupId['id']))
  }

}
