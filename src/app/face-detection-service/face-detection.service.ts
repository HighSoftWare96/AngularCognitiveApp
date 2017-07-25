import { environment } from './../../environments/environment';
import { FaceDetectionData } from './../definitions/FaceDetectionDefine';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FaceDetectionService {

  private fileData: any = undefined;
  public emotions: String[] = [];
  public canvasVisibility: String = 'hidden';
  public ImageResultArray: FaceDetectionData[] = [];

  constructor(private http: Http) { }

  public clearResults() {
    this.ImageResultArray = [];
  }

  public readNewByteImage(inputValue: any): void {
    // prendo il primo file che si è memorizzato nell'evento
    const fileInput: File = inputValue.files[0];
    const inputFromFile: FileReader = new FileReader();
    inputFromFile.onloadend = function (e) {
      console.log(inputFromFile.result);
      this.fileData = inputFromFile.result;
    }.bind(this);
    inputFromFile.readAsArrayBuffer(fileInput);
  }

  public sendRequestData(): Observable<FaceDetectionData[]> {
    if (this.fileData !== undefined) {
      this.emotions = [];
      const url = environment.url_face;
      const h = new Headers();
      h.append('Ocp-Apim-Subscription-Key', environment.subscription_key_face);
      h.append('Content-Type', 'application/octet-stream');

      return this.http.post(url, this.fileData, { headers: h })
        .map(res => {
          this.ImageResultArray = [];
          this.ImageResultArray = res.json();
          this.ImageResultArray.forEach(function(item){
            item.faceAttributes.hair.hairColor.forEach(function(colorItem){
              if (colorItem.confidence > 0.6) {
                item.faceAttributes.hair.colorDetected = colorItem.color;
              }
            });
          });
          console.dir(this.ImageResultArray);
          return this.ImageResultArray;
        });
    }
  }

}
