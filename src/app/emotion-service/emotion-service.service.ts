import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResultData } from '../definitions';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

@Injectable()
export class EmotionService {

  public loading: boolean = false;
  public ImageResultArray: ResultData[] = [];
  private fileData: any = undefined;
  public emotions: String[] = [];
  public canvasVisibility: String = "hidden";

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
  
  public readNewBase64Image(inputValue: any,  imageCanvas : any, ctx: any): void {
    // prendo il primo file che si è memorizzato nell'evento
    const fileInput: File = inputValue.files[0];
    const inputFromFile64: FileReader = new FileReader();

    inputFromFile64.onloadend = function (e) {
      this.rawFileDataCanvas = inputFromFile64.result;
      const img = new Image();
      img.src = this.rawFileDataCanvas;
      img.onload = function (i) {
        imageCanvas.nativeElement.width = img.width;
        imageCanvas.nativeElement.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }.bind(this);
    }.bind(this);

    inputFromFile64.readAsDataURL(fileInput);
  }

  public busy() : boolean{
    return this.loading;
  }
  public getEmotions(){
    return this.emotions;
  }

 public  sendRequestData() {
    if (this.fileData != undefined) {
      this.emotions = [];
      this.loading = true;
      let url = environment.url_cognitive;
      let h = new Headers();
      h.append('Ocp-Apim-Subscription-Key', environment.subscription_key);
      h.append('Content-Type', 'application/octet-stream');
      this.http.post(url, this.fileData, { headers: h })
        .subscribe(
        res => {
          this.ImageResultArray = [];
          let result = res.json();
          result.forEach(iR => {
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
          });
          this.loading = false;
        },
        err => {
          console.log(err.json());
          this.loading = false;
        }
        );
      return this.ImageResultArray;
    }
  }

  private getPercentageValues(value: number): number {
    if (value < 0.01)
      return 0;
    return value * 100;
  }
}
