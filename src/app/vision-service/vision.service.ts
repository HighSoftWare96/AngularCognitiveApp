import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { VisionData } from './../definitions/VisionDefine';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { UrlResolver } from '@angular/compiler';

@Injectable()
export class VisionService {

  private fileData: any = undefined;
  public results: VisionData = undefined;

  constructor(private http: Http, private urlResolver: UrlResolver) { }

  public sendRequestData(path: string): Observable<VisionData> {
    const url = environment.url_vision;
    const h = new Headers();
    h.append('Ocp-Apim-Subscription-Key', environment.subscription_key_vision);
    h.append('Content-Type', 'application/octet-stream');
    const internal_url = {
      url: this.urlResolver.resolve(module.id, path)
    };
    return this.http.post(url, JSON.stringify(internal_url), { headers: h })
      .map(res => {
        this.results = res.json();
        console.dir(this.results);
        return this.results;
      });

  }

  private readImage(path: string): void {
    console.log(path);
    const file: File = new File([''], path);
    console.dir(file);
    const inputFromFile: FileReader = new FileReader();
    inputFromFile.onloadend = function (e) {
      console.log(inputFromFile.result);
      this.fileData = inputFromFile.result;
    }.bind(this);
    inputFromFile.readAsArrayBuffer(file);
  }
}
