import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest'



@Injectable()
export class LoginProvider {

  loginApi:string = '/h5-api-auth/login?_t=init'

  constructor(public rest: RestProvider) {
      //  this.storage.get('userInfo').then((data) => {
      //      this.loginApi += data.auth_token
      //  })
  }

  loginApp(parameter){
    return this.rest.postUrlReturn(this.loginApi, parameter);
  }

}
