import { CognitiveServices } from './../buttons-frame/buttons-frame.component';
import { FaceDetectionData } from './../definitions/FaceDetectionDefine';
import { FaceDetectionService } from './../face-detection-service/face-detection.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ResultData } from '../definitions/EmotionDefine';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../emotion-rec-api/emotion-rec-api.component';

@Component({
  selector: 'app-face-api',
  templateUrl: './face-api.component.html',
  styleUrls: ['./face-api.component.css'],
  providers: [FaceDetectionService],
})
export class FaceAPIComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('imagePlaceholder') imageCanvas: any;

  title = 'Face analysis API';
  fileName: String = undefined;
  public loading = false;
  private ctx: any;
  public canvasVisibility: String = 'hidden';


  constructor(public faceDService: FaceDetectionService, public dialog: MdDialog) { }

  ngOnInit() {
    this.ctx = this.imageCanvas.nativeElement.getContext('2d');
  }

  openDialog(error: String) {
    this.dialog.open(DialogComponent, {
      data: error,
    });
  }

  addedImage($event): void {
    this.canvasVisibility = 'visible';
    this.fileName = $event.target.files[0].name;
    this.faceDService.readNewByteImage($event.target);
    this.readAndDrawImg($event.target);
  }


  public readAndDrawImg(inputValue: any): void {
    this.faceDService.clearResults();
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
    if (this.fileName !== undefined) {
      // sfrutto il servizio per richiedere i dati dal cognitive
      this.loading = true;
      this.faceDService.sendRequestData().subscribe(item => {
        item.forEach(function (element, index) {
          console.dir(item);
          this.drawRectangle(element, index);
        }.bind(this),
          this.loading = false
        );
      },
        error => {
          this.loading = false;
          this.openDialog(error.statusText);
        }
      );
    } else {
      this.loading = false;
      this.openDialog('No images loaded!');
    }
  }

  public microsoftLink() {
    window.open('https://azure.microsoft.com/en-us/services/cognitive-services/face/', '_blank');
  }

  public docLink() {
    window.open('https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/javascript', '_blank');
  }

  private drawRectangle(iR: FaceDetectionData, index: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = '2';
    this.ctx.rect(iR.faceRectangle.left, iR.faceRectangle.top, iR.faceRectangle.width, iR.faceRectangle.height);
    this.ctx.stroke();
    this.ctx.font = '20px Myriad Pro';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('Individual n.' + index, iR.faceRectangle.left, iR.faceRectangle.top);
  }
}
