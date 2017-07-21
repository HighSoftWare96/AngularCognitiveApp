import { ResultData } from './../definitions';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmotionService {

  public ImageResultArray: ResultData[] = [];
  private fileData: any = undefined;
  public emotions: String[] = [];
  public canvasVisibility: String = 'hidden';

  constructor(private http: Http) { }

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


  public sendRequestData(): Observable<ResultData[]> {
    if (this.fileData !== undefined) {
      this.emotions = [];
      const url = environment.url_cognitive;
      const h = new Headers();
      h.append('Ocp-Apim-Subscription-Key', environment.subscription_key);
      h.append('Content-Type', 'application/octet-stream');

      return this.http.post(url, this.fileData, { headers: h })
        .map(res => {
            this.ImageResultArray = [];
            const result: ResultData[] = res.json();
            result.forEach(iR => {
              if ((iR.scores.anger = this.getPercentageValues(iR.scores.anger)) > 0) {
                this.emotions.push('Anger');
              }
              if ((iR.scores.contempt = this.getPercentageValues(iR.scores.contempt)) > 0) {
                this.emotions.push('Contempt');
              }
              if ((iR.scores.disgust = this.getPercentageValues(iR.scores.disgust)) > 0) {
                this.emotions.push('Disgust');
              }
              if ((iR.scores.fear = this.getPercentageValues(iR.scores.fear)) > 0) {
                this.emotions.push('Fear');
              }
              if ((iR.scores.happiness = this.getPercentageValues(iR.scores.happiness)) > 0) {
                this.emotions.push('Happiness');
              }
              if ((iR.scores.neutral = this.getPercentageValues(iR.scores.neutral)) > 0) {
                this.emotions.push('Neutral');
              }
              if ((iR.scores.sadness = this.getPercentageValues(iR.scores.sadness)) > 0) {
                this.emotions.push('Sadness');
              }
              if ((iR.scores.surprise = this.getPercentageValues(iR.scores.surprise)) > 0) {
                this.emotions.push('Surprise');
              }
              this.ImageResultArray.push(iR);
            });

            return this.ImageResultArray;
        });
    }
  }

  private getPercentageValues(value: number): number {
    if (value < 0.65) {
      return 0;
    }
    return value * 100;
  }
}
