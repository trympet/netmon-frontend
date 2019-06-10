import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  navLinks: Array<any> = [
    {name: 'Dashboard', routerLink: '/dashboard'},
    {name: 'Groups', routerLink: '/groups'},

  ]

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
  }

}
