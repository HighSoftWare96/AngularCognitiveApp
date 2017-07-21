import { Component, OnInit } from '@angular/core';
import { MdSidenavModule } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Microsoft Cognitive with Angular 2';
  constructor() { }

  ngOnInit() {
  }

}
