import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {SessionAlertDialogComponent} from "../../../dialogs/session-alert-dialog/session-alert-dialog.component";

import {MatDialog} from "@angular/material/dialog";
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private userData: any = null;
  public loadingPage: boolean = false;
  public pageLoading: boolean = false;
  isSave: boolean = false;

  constructor(private _http: HttpClient,
              public _dialog: MatDialog) {
  }
  
  getToken() {

    let token = null;

    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('typeToken') != null && sessionStorage.getItem('accessToken') != null) {
        // @ts-ignore
        token  = sessionStorage.getItem('accessToken');
      }
    }
    return token;

  }


  getCampaignList(filter: any, page: number, limit: number, orderBy: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/campagnes', {
        observe: 'response',
        params: new HttpParams({fromString:  `page=${page}&limit=${limit}&order_by=${orderBy}`})
      });
  }

  getCampaignById(id:any) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/campagnes/'+id, {
        observe: 'response',
      });
  }

  onSaveCampaign(data:any) {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    
    return this._http
    .post<HttpResponse<any>>(environment.customersService+'/v1/campagnes',data, {
      headers: headers,
      observe: 'response'
    });
  }

  onEditCampaign(id:any,payload:any) {
    return this._http
    .put<HttpResponse<any>>(environment.customersService+'/v1/campagnes/'+id,payload, {
      observe: 'response'
    });
  }
  
  onDeleteCampaign(id:any) {
    return this._http
    .delete<HttpResponse<any>>(environment.customersService+'/v1/campagnes/'+id, {
      observe: 'response'
    });
  }

}
