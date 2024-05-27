import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
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

  getProfileData(id: number) {
    return this._http
      .get<HttpResponse<any>>(environment.usersService+`/api/v1/users/profiles/${id}`, {observe: 'response'});
  }


  getProfiles(sort: string, order: string, page: number, size: number) {
      return this._http
        .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles?pageNumber='
          +page+'&pageSize='+size+'&orderBy='+sort+'&orderDirection='+order, {observe: 'response'});
  }

  userProfileSave(requestData: any) {
      return this._http
        .post<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/save', requestData, {observe: 'response'});
  }

  userProfileEdit(requestData: any, id: number) {
      return this._http
        .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/profiles/save/'+id, requestData, {observe: 'response'});
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
      .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/profiles/enabled/'+id, {observe: 'response'});
  }

  managerUsersToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users/enabled/'+id, {observe: 'response'});
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

  getUsersListData(page: number) {
    let requestData = {};
    return this._http
      .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/managers/accounts/users?page='+page, {observe: 'response'});
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

  getSegmentListData(sort: string, order: string, page: number, size: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/segments?pageNumber='
        +page+'&pageSize='+size+'&orderBy='+sort+'&orderDirection='+order, {observe: 'response'});
  }

  saveSegmentToggleEnable(id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/segments/enabled/'+id, {observe: 'response'});
  }


  saveSegmentAdd(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/segments', requestData, {observe: 'response'});
  }

  saveSegmentEdit(requestData: any, id: number) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/segments/'+id, requestData, {observe: 'response'});
  }

  saveSegmentRemove(id: number) {
    return this._http
      .delete<HttpResponse<any>>(environment.productsService+'/api/v1/segments/'+id, {observe: 'response'});
  }

  // Guarantees

  onGetGuaranteeList(sort: string, order: string, page: number, size: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/guarantees?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, {observe: 'response'});
  }

  onGetUserGroupList() {
    return this._http
      .get<HttpResponse<any>>(environment.usersService+'/api/v1/users/groups', {observe: 'response'});
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

  getProductGroups(sort: string, order: string, page: number, size: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/productGroups?sort='
        +sort+'&order='+order+'&page='+page+'&size='+size, {observe: 'response'});
  }

  getProductGroupsGuarantees() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/productGroups/guarantees', {observe: 'response'});
  }

  getProductGroupsGuaranteesForPrime() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/lists/productGroups/guarantees/primes', {observe: 'response'});
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

  getFormQuotations(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/quotations?page='+page, {observe: 'response'});
  }

  getPricingList(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/pricing/primes?page='+page, {observe: 'response'});
  }


  addPricing(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/pricing/primes/add', requestData, {observe: 'response'});
  }

  editPricing(id: number, requestData: any) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/pricing/primes/edit/'+id, requestData, {observe: 'response'});
  }


  getFormSubscriptions(page: number) {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/subscriptions?page='+page, {observe: 'response'});
  }

  getFormQuotationList() {
    return this._http
      .get<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/quotations/list', {observe: 'response'});
  }

  addFormQuotation(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/quotations/add', requestData, {observe: 'response'});
  }

  addFormSubscription(requestData: any) {
    return this._http
      .post<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/subscriptions/add', requestData, {observe: 'response'});
  }

  editFormQuotation(id: number, requestData: any) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/quotations/edit/'+id, requestData, {observe: 'response'});
  }

  editFormSubscription(id: number, requestData: any) {
    return this._http
      .patch<HttpResponse<any>>(environment.productsService+'/api/v1/products/forms/subscriptions/edit/'+id, requestData, {observe: 'response'});
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


  //

  onGetCustomersList(requestData: any) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  'filters={"type_customer_id":"1"}'})
      });
  }

  onGetCustomersListByType(type: string) {
    return this._http
      .get<HttpResponse<any>>(environment.customersService+'/v1/users', {
        observe: 'response',
        params: new HttpParams({fromString:  `filters={"type_customer_id":${type}}`})
      });
  }

  onSaveCustomerAccountValid(userId: any, requestData: any) {
    return this._http
      .put<HttpResponse<any>>(environment.customersService+`/v1/users/switch_validation/${userId}`, requestData, {
        observe: 'response'
      });
  }

  onSaveCustomerAccountReject(userId: any, requestData: any) {
    return this._http
      .put<HttpResponse<any>>(environment.customersService+`/v1/users/switch_validation/${userId}`, requestData, {
        observe: 'response'
      });
  }

}
