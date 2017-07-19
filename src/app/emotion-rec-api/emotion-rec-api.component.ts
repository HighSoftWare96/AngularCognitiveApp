import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultData } from '../definitions';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { EmotionService } from '../emotion-service/emotion-service.service';

@Component({
  selector: 'app-emotion-rec-api',
  templateUrl: './emotion-rec-api.component.html',
  styleUrls: ['./emotion-rec-api.component.css'],
  providers: [EmotionService],
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


  constructor(private emService: EmotionService) { }

  ngOnInit() {
    this.ctx = this.imageCanvas.nativeElement.getContext('2d');
  }

  addedImage($event): void {
    this.canvasVisibility = "visible";
    this.fileName = $event.target.files[0].name;
    this.emService.readNewByteImage($event.target);
    this.readAndDrawImg($event.target);
  }


  public readAndDrawImg(inputValue: any): void {
    // prendo il primo file che si è memorizzato nell'evento
    const fileInput: File = inputValue.files[0];
    const inputFromFile64: FileReader = new FileReader();

    inputFromFile64.onloadend = function (e) {
      this.rawFileDataCanvas = inputFromFile64.result;
      const img = new Image();
      img.src = this.rawFileDataCanvas;
      img.onload = function (i) {
        this.imageCanvas.nativeElement.width = img.width;
        this.imageCanvas.nativeElement.height = img.height;
        this.ctx.drawImage(img, 0, 0, img.width, img.height);
      }.bind(this);
    }.bind(this);

    inputFromFile64.readAsDataURL(fileInput);
  }

  sendImage() {
    // pulisco eventuali risultati precedenti
    this.ImageResultArray = [];
    this.emotions = [];
    // sfrutto il servizio per richiedere i dati dal cognitive
    this.ImageResultArray = this.emService.sendRequestData();
    this.emotions = this.emService.getEmotions();
    // stampo il canvas
    this.ImageResultArray.forEach(function (item, index) {
      this.drawRectangle(item, index);
    }.bind(this));
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

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
  }
}

