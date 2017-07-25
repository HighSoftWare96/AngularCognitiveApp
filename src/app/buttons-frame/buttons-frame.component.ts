import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-buttons-frame',
  templateUrl: './buttons-frame.component.html',
  styleUrls: ['./buttons-frame.component.css'],
})

export class ButtonsFrameComponent implements OnInit {

  available_services: CognitiveServices[] = [new CognitiveServices('Emotion Recognition API', '/emotionAPI', 'remove_red_eye'),
  new CognitiveServices('Face Detection API', '/faceAPI', 'face')];

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

export class CognitiveServices {
  public name: String;
  public link: String;
  public icon: String;

  constructor(name: String, link: String, icon: String){
    this.name = name;
    this.link = link;
    this.icon = icon;
  }
}
