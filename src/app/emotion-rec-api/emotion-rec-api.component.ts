import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultData } from '../definitions';
import { Http, RequestOptionsArgs, Headers } from "@angular/http";


@Component({
  selector: 'app-emotion-rec-api',
  templateUrl: './emotion-rec-api.component.html',
  styleUrls: ['./emotion-rec-api.component.css']
})
export class EmotionRecAPIComponent implements OnInit {

  @ViewChild("fileInput") fileInput;
  @ViewChild("imagePlaceholder") imageCanvas: HTMLCanvasElement;

  public ImageResultArray: ResultData[];
  public fileName: String;
  private rawFileData: any;
  private rawFileDataCanvas: String;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  addedImage($event): void {
    console.log($event.target.files[0]);
    this.fileName = $event.target.files[0].name;
    this.readNewImage($event.target);
  }

  readNewImage(inputValue: any): void {
    console.log(fileInput);
    // prendo il primo file che si è memorizzato nell'evento
    var fileInput: File = inputValue.files[0];
    var inputFromFile: FileReader = new FileReader();
    var inputFromFile64: FileReader = new FileReader();

    inputFromFile.onloadend = function (e) {
      console.log(inputFromFile.result);
      this.rawfileData = inputFromFile.result;
    }.bind(this);

    inputFromFile64.onloadend = function (e) {
      this.rawFileDataCanvas = inputFromFile64.result;
      let ctx = this.imageCanvas.nativeElement.getContext("2d");
      ctx.drawImage(this.rawFileDataCanvas, 0, 0, this.rawFileDataCanvas.width, this.rawFileDataCanvas.height);
    }.bind(this);

    inputFromFile.readAsArrayBuffer(fileInput);
    inputFromFile64.readAsDataURL(fileInput);
  }

  sendImage() {
    var microsoftURL = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize";
    var header = new Headers();
    header.append('Ocp-Apim-Subscription-Key', 'ee7e4d6c84fe4be89220d3fb0c7c9999');
    header.append('Content-Type', 'application/octet-stream');

    this.http.post(microsoftURL, this.rawFileData, { headers: header })
      .subscribe(
      res => {
        this.ImageResultArray = [];
        let result = res.json();
        result.forEach(imageResult => {
          if (imageResult.scores.anger < 0.01) {
            imageResult.scores.anger = 0;
          } else {
            imageResult.scores.anger = imageResult.scores.anger * 100;
          }

          if (imageResult.scores.contempt < 0.01) {
            imageResult.scores.contempt = 0;
          } else {
            imageResult.scores.contempt = imageResult.scores.contempt * 100;
          }

          if (imageResult.scores.disgust < 0.01) {
            imageResult.scores.disgust = 0;
          } else {
            imageResult.scores.disgust = imageResult.scores.disgust * 100;
          }

          if (imageResult.scores.fear < 0.01) {
            imageResult.scores.fear = 0;
          } else {
            imageResult.scores.fear = imageResult.scores.fear * 100;
          }

          if (imageResult.scores.happiness < 0.01) {
            imageResult.scores.happiness = 0;
          } else {
            imageResult.scores.happiness = imageResult.scores.happiness * 100;
          }

          if (imageResult.scores.neutral < 0.01) {
            imageResult.scores.neutral = 0;
          } else {
            imageResult.scores.neutral = imageResult.scores.neutral * 100;
          }

          if (imageResult.scores.sadness < 0.01) {
            imageResult.scores.sadness = 0;
          } else {
            imageResult.scores.sadness = imageResult.scores.sadness * 100;
          }

          if (imageResult.scores.surprise < 0.01) {
            imageResult.scores.surprise = 0;
          } else {
            imageResult.scores.surprise = imageResult.scores.surprise * 100;
          }

          this.ImageResultArray.push(imageResult);
        });
      },
      err => {
        console.log(err.json())
      }
      );
  }

}
