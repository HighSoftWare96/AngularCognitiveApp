import { Component, OnInit } from '@angular/core';
import { ResultData } from '../definitions';

@Component({
  selector: 'app-emotion-rec-api',
  templateUrl: './emotion-rec-api.component.html',
  styleUrls: ['./emotion-rec-api.component.css']
})
export class EmotionRecAPIComponent implements OnInit {
  public ImageResultArray: ResultData[];

  constructor() { }

  ngOnInit() {
  }

}
