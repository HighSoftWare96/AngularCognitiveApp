import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultData } from '../definitions';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

@Component({
  selector: 'app-emotion-rec-api',
  templateUrl: './emotion-rec-api.component.html',
  styleUrls: ['./emotion-rec-api.component.css']
})
export class EmotionRecAPIComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('imagePlaceholder') imageCanvas: any;

  public loading: boolean = false;
  public ImageResultArray: ResultData[] = [];
  public fileName: String;
  private fileData: any = undefined;
  public emotions: String[] = [];
  private rawFileDataCanvas: String;
  private ctx: any;
  public canvasVisibility: String = "hidden";


  constructor(private http: Http) { }

  ngOnInit() {
    this.ctx = this.imageCanvas.nativeElement.getContext('2d');
  }

  addedImage($event): void {
    this.canvasVisibility = "visible";
    console.log($event.target.files[0]);
    this.fileName = $event.target.files[0].name;
    this.readNewByteImage($event.target);
    this.readNewBase64Image($event.target);
  }

  readNewByteImage(inputValue: any): void {
    // prendo il primo file che si è memorizzato nell'evento
    const fileInput: File = inputValue.files[0];
    const inputFromFile: FileReader = new FileReader();
    inputFromFile.onloadend = function (e) {
      console.log(inputFromFile.result);
      this.fileData = inputFromFile.result;
    }.bind(this);
    inputFromFile.readAsArrayBuffer(fileInput);
  }
  readNewBase64Image(inputValue: any): void {
    // prendo il primo file che si è memorizzato nell'evento
    const fileInput: File = inputValue.files[0];
    const inputFromFile64: FileReader = new FileReader();

    inputFromFile64.onloadend = function (e) {
      this.rawFileDataCanvas = inputFromFile64.result;
      const img = new Image();
      img.src = this.rawFileDataCanvas;
      img.onload = function (i) {
        this.clearCanvas();
        this.imageCanvas.nativeElement.width = img.width;
        this.imageCanvas.nativeElement.height = img.height;
        this.ctx.drawImage(img, 0, 0, img.width, img.height);
      }.bind(this);
    }.bind(this);

    inputFromFile64.readAsDataURL(fileInput);
  }

  sendImage() {
    if (this.fileData != undefined) {
      this.emotions = [];
      this.loading = true;
      let url = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize";
      let h = new Headers();
      h.append('Ocp-Apim-Subscription-Key', 'ee7e4d6c84fe4be89220d3fb0c7c9999');
      h.append('Content-Type', 'application/octet-stream');
      this.http.post(url, this.fileData, { headers: h })
        .subscribe(
        res => {
          this.ImageResultArray = [];
          let result = res.json();
          result.forEach(iR => {
            this.loading = true;
            iR.scores.anger = this.getPercentageValues(iR.scores.anger);
            if (iR.scores.anger > 65)
              this.emotions.push("Anger");
            iR.scores.contempt = this.getPercentageValues(iR.scores.contempt);
            if (iR.scores.contempt > 65)
              this.emotions.push("Contempt");
            iR.scores.disgust = this.getPercentageValues(iR.scores.disgust);
            if (iR.scores.disgust > 65)
              this.emotions.push("Disgust");
            iR.scores.fear = this.getPercentageValues(iR.scores.fear);
            if (iR.scores.fear > 65)
              this.emotions.push("Fear");
            iR.scores.happiness = this.getPercentageValues(iR.scores.happiness);
            if (iR.scores.happiness > 65)
              this.emotions.push("Happiness");
            iR.scores.neutral = this.getPercentageValues(iR.scores.neutral);
            if (iR.scores.neutral > 65)
              this.emotions.push("Neutral");
            iR.scores.sadness = this.getPercentageValues(iR.scores.sadness);
            if (iR.scores.sadness > 65)
              this.emotions.push("Sadness");
            iR.scores.surprise = this.getPercentageValues(iR.scores.surprise);
            if (iR.scores.surprise > 65)
              this.emotions.push("Surprise");
            this.ImageResultArray.push(iR);
            this.drawRectangle(iR, this.ImageResultArray.length - 1);
            this.loading = false;
          });
        },
        err => {
          console.log(err.json());
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
        );
    }
  }

  private getPercentageValues(value: number): number {
    if (value < 0.01)
      return 0;
    return value * 100;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
  }

  private drawRectangle(iR: ResultData, index: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = '2';
    this.ctx.rect(iR.faceRectangle.left, iR.faceRectangle.top, iR.faceRectangle.width, iR.faceRectangle.height);
    this.ctx.stroke();
    this.ctx.font = "20px Myriad Pro";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Individual n." + index, iR.faceRectangle.left, iR.faceRectangle.top);
  }
}

