import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { VisionData } from './../definitions/VisionDefine';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

@Injectable()
export class VisionService {
  
  private fileData: any = undefined;
  public results: VisionData = undefined;

  constructor(private http: Http) { }

  public sendRequestData(path: string): Observable<VisionData> {
    this.readImage(path);
    const url = environment.url_vision;
    const h = new Headers();
    h.append('Ocp-Apim-Subscription-Key', environment.subscription_key_vision);
    h.append('Content-Type', 'application/octet-stream');

    return this.http.post(url, this.fileData, { headers: h })
      .map(res => {
        this.results = res.json();
        console.dir(this.results);
        return this.results;
      });

  }

  private readImage(path: string): void {
    const file = new File([''], path);
    const inputFromFile: FileReader = new FileReader();
    inputFromFile.onloadend = function (e) {
      this.fileData = inputFromFile.result;
    }.bind(this);
    inputFromFile.readAsArrayBuffer(file);
  }
}
