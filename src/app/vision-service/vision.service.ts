import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { VisionData } from './../definitions/VisionDefine';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Location } from '@angular/common';

@Injectable()
export class VisionService {

  private fileData: any = undefined;
  public results: VisionData = undefined;

  constructor(private location: Location, private http: Http) { }

  public sendRequestData(path: string): Observable<VisionData> {
    this.clearData();
    const url = environment.url_vision;
    const h = new Headers();
    h.append('Ocp-Apim-Subscription-Key', environment.subscription_key_vision);

    return this.http.post(url, { url: path }, { headers: h })
      .map(res => {
        this.results = res.json();
        return this.results;
      });

  }

  public clearData() {
    this.results = undefined;
  }
}
