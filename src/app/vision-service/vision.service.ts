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
    const url = environment.url_vision;
    const h = new Headers();
    h.append('Ocp-Apim-Subscription-Key', environment.subscription_key_vision);

    console.log(path);
    return this.http.post(url, { url: path }, { headers: h })
      .map(res => {
        this.results = res.json();
        console.dir(this.results);
        return this.results;
      });

  }
}
