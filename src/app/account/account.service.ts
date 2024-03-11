import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SessionAlertDialogComponent} from "./dialogs/session-alert-dialog/session-alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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

  getUsername() {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('typeToken') != null && sessionStorage.getItem('accessToken') != null) {
        // @ts-ignore
        let jwt = sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
        this.userData = new JwtHelperService().decodeToken(jwt);
        return this.userData.username;
      }
    }
  }

  getId() {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('typeToken') != null && sessionStorage.getItem('accessToken') != null) {
        // @ts-ignore
        let jwt = sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
        this.userData = new JwtHelperService().decodeToken(jwt);
        return this.userData.sub;
      }
    }
  }

  getUserData() {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('typeToken') != null && sessionStorage.getItem('accessToken') != null) {
        // @ts-ignore
        let jwt = sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
        this.userData = new JwtHelperService().decodeToken(jwt);
        return this.userData;
      }
    }
  }

  getProfileList() {
      return this._http
        .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/getList', {observe: 'response'});
  }


  getProfiles(page: number) {
      return this._http
        .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles?page='+page, {observe: 'response'});
  }

  userProfileSave(requestData: any) {
      return this._http
        .post<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/save', requestData, {observe: 'response'});
  }

  userProfileEdit(requestData: any, id: number) {
      return this._http
        .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/save/edit/'+id, requestData, {observe: 'response'});
  }

  getUserProfile(requestData: any) {
      return this._http
        .post<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles', requestData, {observe: 'response'});
  }

  editUserProfile(requestData: any) {
      return this._http
        .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/'+requestData.id, requestData, {observe: 'response'});
  }

  editUserProfilePassword(requestData: any) {
      return this._http
        .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/'+requestData.id+'/password', requestData, {observe: 'response'});
  }

  userFirstTimeChangePassword(requestData: any) {
    return this._http
      .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/login/first-time/'+requestData.id+'/password', requestData, {observe: 'response'});
  }

  managerAddUserAccount(requestData: any) {
      return this._http
        .post<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users/save', requestData, {observe: 'response'});
  }

  managerEditUserAccount(requestData: any) {
      return this._http
        .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users/save/'+requestData.id, requestData, {observe: 'response'});
  }

  managerProfileToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users/profiles/enabled/'+id, {observe: 'response'});
  }

/*  getUsersListData(sort: string, order: string, page: number, size: number) {
    let requestData = {};
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/users?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, requestData, {observe: 'response'});
  }*/

/*  getUsersListData(sort: string, order: string, page: number, size: number) {
    let requestData = {};
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/users/managers/accounts/users?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, requestData, {observe: 'response'});
  }*/

  getUsersListData(sort: string, order: string, page: number, size: number) {
    let requestData = {};
    return this._http
      .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, {observe: 'response'});
  }

  /*** ***/

  getPartnerTypeList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners/types', {observe: 'response'});
  }

  getPartnerGroupList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners/groups', {observe: 'response'});
  }


  getPartnerListData(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners?page='+page, {observe: 'response'});
  }

  savePartnerAdd(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners', requestData, {observe: 'response'});
  }

  savePartnerEdit(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners/'+id, requestData, {observe: 'response'});
  }

  savePartnerRemove(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners/'+id, {observe: 'response'});
  }

  savePartnerToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/partners/enabled/'+id, {observe: 'response'});
  }

  getBranchesListData(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/branches?page='+page, {observe: 'response'});
  }


  saveBranchAdd(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/branches', requestData, {observe: 'response'});
  }

  saveBranchEdit(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/branches/'+id, requestData, {observe: 'response'});
  }

  saveBranchRemove(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/branches/'+id, {observe: 'response'});
  }

  saveBranchToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/branches/enabled/'+id, {observe: 'response'});
  }

  //

  getZoneListData(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/zones?page='+page, {observe: 'response'});
  }


  saveZoneAdd(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/zones', requestData, {observe: 'response'});
  }

  saveZoneEdit(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/zones/'+id, requestData, {observe: 'response'});
  }

  saveZoneRemove(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/zones/'+id, {observe: 'response'});
  }

  saveZoneToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/zones/enabled/'+id, {observe: 'response'});
  }


  //

  getSegmentListData(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/segments?page='+page, {observe: 'response'});
  }

  saveSegmentToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/segments/enabled/'+id, {observe: 'response'});
  }


  saveSegmentAdd(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/segments', requestData, {observe: 'response'});
  }

  saveSegmentEdit(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/segments/'+id, requestData, {observe: 'response'});
  }

  saveSegmentRemove(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/segments/'+id, {observe: 'response'});
  }

  // Guarantees

  getGuarantees(sort: string, order: string, page: number, size: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, {observe: 'response'});
  }

  onGetGuarantees(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees?page='+page, {observe: 'response'});
  }

  addGuarantee(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees', requestData, {observe: 'response'});
  }

  editGuarantee(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees/'+id, requestData, {observe: 'response'});
  }

  removeGuarantee(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees/'+id, {observe: 'response'});
  }

  addGuaranteeItem(requestData: any, guaranteeId: number) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees/'+guaranteeId+'/items', requestData, {observe: 'response'});
  }

  getGuaranteeItems(guaranteeId: number) {
    return this._http
      .get<HttpResponse<any[]>>(environment.productsService+'/api/v1/products/guarantees/'+guaranteeId+'/items', {observe: 'response'});
  }

  removeGuaranteeItem(guaranteeId: number, itemId: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees/'+guaranteeId+'/items/'+itemId, {observe: 'response'});
  }

  getProductGroups(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/productGroups?page='+page, {observe: 'response'});
  }

  addProductGroup(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/productGroups', requestData, {observe: 'response'});
  }

  editProductGroup(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/productGroups/'+id, requestData, {observe: 'response'});
  }

  getProducts(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products?page='+page, {observe: 'response'});
  }

  //
  addProduct(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products', requestData, {observe: 'response'});
  }

  editProduct(id: number, requestData: any) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/'+id, requestData, {observe: 'response'});
  }


  saveProductImage(id: number, requestData: FormData) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/'+id+'/images', requestData, {observe: 'response'});
  }

  onSaveProductAdvertisementObjectFile(id: number, requestData: FormData) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/'+id+'/files/advertisementObjects', requestData, {observe: 'response'});
  }


  //

  getPeriodList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/periods', {observe: 'response'});
  }

  getZoneList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/zones', {observe: 'response'});
  }

  getPartnerList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/partners', {observe: 'response'});
  }

  getPartnerCommercialList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/partners/commercials', {observe: 'response'});
  }

  getBranchList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/branches', {observe: 'response'});
  }

  getGuaranteeList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/guarantees', {observe: 'response'});
  }

  getProductGroupList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/productGroups', {observe: 'response'});
  }

  getSegmentList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/segments', {observe: 'response'});
  }

  getIncentiveList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/incentives', {observe: 'response'});
  }

  onGetTokenExpirationTime() {

    if (typeof sessionStorage !== 'undefined') {
      // @ts-ignore
      let expirationTime = new JwtHelperService().getTokenExpirationDate(sessionStorage.getItem('accessToken'));

      // @ts-ignore
      let startTime = new Date().getTime();
      // @ts-ignore
      let endTime = new Date(expirationTime).getTime();
      let differenceTime = endTime - startTime;
      let minutes = Math.round(differenceTime / 60000)
console.log(minutes);
      switch (minutes) {
        case 60:
          this.onSessionAlertDialog(expirationTime)
          break;
        case 30:
          this.onSessionAlertDialog(expirationTime)
          break;
        case 20:
          this.onSessionAlertDialog(expirationTime)
          break;
        case 10:
          this.onSessionAlertDialog(expirationTime)
          break;
        case 5:
          this.onSessionAlertDialog(expirationTime)
          break;
        case 1:
          this.onSessionAlertDialog(expirationTime)
          break;
        default:
      }
    }

  }

  onSessionAlertDialog(data: any): void {

    const dialogRef = this._dialog.open(SessionAlertDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
