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

  onGetCampaignList(page: number, limit: number, orderBy: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/campagnes', {
        observe: 'response',
        params: new HttpParams({fromString: `page=${page}&limit=${limit}&order_by=${orderBy}`})
      });
  }

  onGetCustomerAccountRequestListByType(userType: string, filter: any, page: number, limit: number, orderBy: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"validation_status":${filter.validation_status}}&code=${userType}&page=${page}&limit=${limit}&order_by=${orderBy}`})
      });
  }

  onGetCustomerAccountListByType(userType: string, filter: any, page: number, limit: number, orderBy: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"validation_status":${filter.validation_status}}&code=${userType}&page=${page}&limit=${limit}&order_by=${orderBy}`})
      });
  }

  onGetCustomerAccountById(id: number) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+`/v1/users/${id}`, {
        observe: 'response'
      });
  }

  onGetCustomerAccountInsureds(filter: any) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/assures', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"created_user":${filter.created_user}}&order_by=-updated_at`})
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
