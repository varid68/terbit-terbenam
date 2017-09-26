import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestApiProvider {

  constructor(public http: Http) {
    console.log('Hello RestApiProvider Provider');
  }

  terbitTerbenam(lat:number, long:number, date: any): Observable<any>{
    if (date == undefined) {
      date = 'today';
    }
    return this.http.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${date}&formatted=0`)
    		.map(this.extract);
  }

  private extract (res:Response){
  	let body = res.json();

  	return body || {};
  }

  

}
