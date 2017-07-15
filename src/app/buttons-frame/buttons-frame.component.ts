import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@Component({
  selector: 'buttons-frame',
  templateUrl: './buttons-frame.component.html',
  styleUrls: ['./buttons-frame.component.css'],
})

export class ButtonsFrameComponent implements OnInit {

  available_services = ['Emotion Recognition API', 'Face Recognition API', 'Bing images search', 'Text analytics', 'Traslator API'];

  constructor(private location: Location, private router: Router) { }

  

  ngOnInit() {
  }

  changeRouting(service) {
    switch (service) {
      case this.available_services[0]:
        this.router.navigate(['/emotionAPI']);
        break;
      case this.available_services[1]:
        this.router.navigate(['/faceAPI']);
        break;
    }
  }

}
