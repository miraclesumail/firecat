import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';

let baseUrl = 'http://stg.zhenwin.com'
//let baseUrl = 'http://user.firecat.com'


@Injectable()
export class RestProvider {

  // authToken:string = 'init';
  // user:any;

  constructor(public http: HttpClient) {

  }
  //
  // getToken(){
  //   this.storage.get('userInfo').then((val) => {
  //     console.log(val)

  //     this.authToken = val.auto_token
  //   });
  //
  // }

  postUrlReturn(url: string,parameter): Observable<any> {
   // return this.http.post('http://user.firecat.com'+url,parameter)
    // this.getToken()
    return this.http.post(baseUrl+url,parameter)
  }

  getUrlReturn(url: string): Observable<any> {
    return this.http.get(baseUrl+url)
  }

  // extractData(res: Response) {
  //   let body = res;
  //   return JSON.parse(body) || {};
  // }
  //
  // handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = '${error.status - $(error.statusText || " ") $(err)';
  //   } else {
  //     errMsg = error.massage ? error.massage : error.toString();
  //   }
  //   console.error(errMsg)
  //   return Observabale.throw(errMsg)
  // }

}
