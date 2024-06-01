import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  constructor(private _http: HttpClient) {}

  onGetQuotation(request: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/simulations/quote', request, {observe: 'response'});
  }

}
