import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';

@Injectable()
export class SignupProvider {

  getRegisterParamApi = '/h5-api-auth/register?_t=init';

  constructor(public http: HttpClient,public rest: RestProvider) {

  }

  getRegisterParam(_keyword) {
    return this.rest.getUrlReturn(this.getRegisterParamApi + _keyword)
  }

  postRegisterData(parameter){
    return this.rest.postUrlReturn(this.getRegisterParamApi, parameter);
  }

}
