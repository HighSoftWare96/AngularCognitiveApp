import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'buttons-frame',
  templateUrl: './buttons-frame.component.html',
  styleUrls: ['./buttons-frame.component.css']
})
export class ButtonsFrameComponent implements OnInit {

  available_services = ['Emotion Recognition', 'Face Recognition', 'Bing images search', 'Text analytics', 'Traslator'];

  constructor() { }

  ngOnInit() {
  }

}
