import { DialogComponent } from '../emotion-rec-api/emotion-rec-api.component';
import { MdDialog } from '@angular/material';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { VisionService } from '../vision-service/vision.service';
import { VisionData } from './../definitions/VisionDefine';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  providers: [VisionService, { provide: MD_DIALOG_DATA, useValue: {} },
    { provide: MdDialogRef, useValue: {} }, ],
})
export class VisionComponent implements OnInit {
  public loading = false;
  public images: ImageView[] = [new ImageView('https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/1.jpg', 'https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/min/1.jpg', false),
  new ImageView('https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/2.jpg', 'https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/min/2.jpg', false),
  new ImageView('https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/3.jpg', 'https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/min/3.jpg', false),
  new ImageView('https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/4.jpg', 'https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/min/4.jpg', false),
  new ImageView('https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/5.jpg', 'https://raw.githubusercontent.com/HighSoftWare96/AngularCognitiveApp/master/src/assets/images/gallery_visio/min/5.jpg', false)];
  public selectedImage: ImageView = undefined;

  constructor(public visionService: VisionService, public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog(error: String) {
    this.dialog.open(DialogComponent, {
      data: error,
    });
  }

  public microsoftLink() {
    window.open('https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/', '_blank');
  }

  public docLink() {
    window.open('https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts/javascript', '_blank');
  }

  public sendImage() {
    if (this.selectedImage !== undefined) {
      // sfrutto il servizio per richiedere i dati dal cognitive
      this.loading = true;
      this.visionService.sendRequestData(this.selectedImage.path).subscribe(item => {
        this.loading = false;
      },
        error => {
          this.loading = false;
          console.log(error);
          this.openDialog(error.statusText);
        }
      );
    } else {
      this.loading = false;
      this.openDialog('No images loaded!');
    }
  }

  public clickedImage(index: number): void {
    if (this.loading === false) {
      // this.visionService.readImage(this.images[index].path);
      const path = this.images[index].path;
      this.images[index].selected = true;
      this.selectedImage = this.images[index];
      this.clearOtherSelections(index);
    }
  }

  clearOtherSelections(index: number): void {
    let i: number;
    for (i = 0; i < this.images.length; i++) {
      if (i !== index) {
        this.images[i].selected = false;
      }
    }
  }

}

export class ImageView {
  path: string;
  pathMin: string;
  selected: boolean;

  constructor(path: string, pathMin: string, selected: boolean) {
    this.path = path;
    this.pathMin = pathMin;
    this.selected = selected;
  }
}
