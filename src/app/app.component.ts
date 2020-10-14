import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flag: boolean = false;
  flagsign: boolean = false;
  flagdoc: boolean = false;
  title = 'vsigned';
  constructor(private router: Router) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.flag = true;
  }
  dashboard(): void {
    this.router.navigate(['dashboard']);
    this.flag = true;
    this.flagsign = false;
    this.flagdoc = false;
  }
  document(): void {
    this.router.navigate(['document']);
    this.flagdoc = true;
    this.flag = false;
    this.flagsign = false;
  }
  signing(): void {
    this.router.navigate(['signing']);
    this.flagsign = true;
    this.flag = false;
    this.flagdoc = false;

  }
}
