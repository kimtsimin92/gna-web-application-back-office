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

  onGetCustomerAccountRequestListByType(filter: any, page: number, limit: number, orderBy: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"type_customer_id":${filter.type_customer_id}}&page=${page}&limit=${limit}&order_by=${orderBy}`})
      });
  }

  onGetCustomerAccountFilesById(filters: any) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/medias', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"user_id":${filters.user_id}}`})
      });
  }

}
