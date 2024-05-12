import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ManagerCustomerAccountService {

  constructor(
    private _http: HttpClient
  ) { }

  onGetCustomerAccountRequestListByType(pageNumber: number, limit: number, filters: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"type_customer_id":${filters}}&page=${pageNumber}&limit=${limit}`})
      });
  }

}
