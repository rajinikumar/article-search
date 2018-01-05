import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
	result:any;

  constructor(private _http: Http) { }

  getUsers(params) {
  	console.log(params);
    return this._http.get("/api/articles", {
   search: params }).map(result => this.result = result.json().data);
  }

}
