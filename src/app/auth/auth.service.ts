import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AuthJwt} from "./auth-jwt";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthErrorDialogComponent} from "./auth-dialog/auth-error-dialog/auth-error-dialog.component";
import {AuthSuccessDialogComponent} from "./auth-dialog/auth-success-dialog/auth-success-dialog.component";
import {environment} from "../../environments/environment";
import {AuthLoginDialogComponent} from "./auth-dialog/auth-login-dialog/auth-login-dialog.component";
import {AuthLogoutDialogComponent} from "./auth-dialog/auth-logout-dialog/auth-logout-dialog.component";
import {LoginFirstTimeDialogComponent} from "./auth-dialog/login-first-time-dialog/login-first-time-dialog.component";
import {
  AuthPasswordForgotEmailDialogComponent
} from "./auth-dialog/auth-password-forgot-email-dialog/auth-password-forgot-email-dialog.component";
import {
  AuthPasswordForgotEmailErrorDialogComponent
} from "./auth-dialog/auth-password-forgot-email-error-dialog/auth-password-forgot-email-error-dialog.component";
import {SessionAlertDialogComponent} from "../account/dialogs/session-alert-dialog/session-alert-dialog.component";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isError: boolean = false;
  response: HttpResponse<any> | undefined;
  errorResponse: HttpErrorResponse | undefined;

  authJwt: AuthJwt | undefined | null;
  isLoggedIn: boolean | undefined;

  redirectUrl: string | undefined;
  loading: boolean = false;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 10;

  constructor(private _http: HttpClient,
              private _router: Router,
              private _snackBar: MatSnackBar,
              public _dialog: MatDialog,) {
    this.isError = false;
  }

  setJWT(jwtData: any) {
    sessionStorage.setItem('typeToken', jwtData['typeToken']);
    sessionStorage.setItem('accessToken', jwtData['accessToken']);
  }

  removeJWT() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('typeToken');
      sessionStorage.removeItem('accessToken');
    }
  }

  clearAll() {

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

  }

  decodeJWT(token: string) {

    this.authJwt = new JwtHelperService().decodeToken(token);

    // @ts-ignore
    if (this.authJwt.groups) {
      // @ts-ignore
      if (this.authJwt.groups.length > 0) {
        // @ts-ignore
        let groups = [];
        // @ts-ignore
        for (let i = 0; i < this.authJwt.groups.length; i++) {
          // @ts-ignore
          groups[this.authJwt.groups[i]] = this.authJwt.groups[i];
        }
        // @ts-ignore
        this.authJwt.groups = groups;
      }
    }

    // @ts-ignore
    if (this.authJwt.roles) {
      // @ts-ignore
      if (this.authJwt.roles.length > 0) {
        // @ts-ignore
        let roles = [];
        // @ts-ignore
        for (let i = 0; i < this.authJwt.roles.length; i++) {
          // @ts-ignore
          roles[this.authJwt.roles[i]] = this.authJwt.roles[i];
        }
        // @ts-ignore
        this.authJwt.roles = roles;
      }
    }

    // @ts-ignore
    if (this.authJwt.permissions) {
      // @ts-ignore
      if (this.authJwt.permissions.length > 0) {
        // @ts-ignore
        let permissions = [];
        // @ts-ignore
        for (let i = 0; i < this.authJwt.permissions.length; i++) {
          // @ts-ignore
          permissions[this.authJwt.permissions[i]] = this.authJwt.permissions[i];
        }
        // @ts-ignore
        this.authJwt.permissions = permissions;
      }
    }
  }

  getJWT(): AuthJwt | undefined | null {
    return this.authJwt;
  }

  getAuthorizationToken() {

    if (typeof sessionStorage !== 'undefined') {
      // @ts-ignore
      return sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
    } else {
      return null;
    }

  }


  isAuth(): boolean {
    if (this.getAuthorizationToken()) {
      // @ts-ignore
      if (new JwtHelperService().isTokenExpired(sessionStorage.getItem('accessToken'))) {
        this.loadingLogout();
      } else {
        // @ts-ignore
        this.decodeJWT(this.getAuthorizationToken());
        // @ts-ignore
        this.isLoggedIn = !!(this.authJwt.username);
      }
    }
    // @ts-ignore
    return this.isLoggedIn;
  }

  loadingAuth(data: any) {

    this.loading = true;
    this.isError = false;

   // this.openLoadingDialog();

    this._http.post<HttpResponse<any>>(environment.usersService + '/api/v1/users/auth/login/web', data, {observe: 'response'})
      .subscribe(response => {


        this.setJWT(response['body']);

        if (this.isAuth()) {

          console.log(this.authJwt);

          const redirect = this.redirectUrl ? this._router.parseUrl(this.redirectUrl) : '/account/home';
          const redirectFirstTime = this.redirectUrl ? this._router.parseUrl(this.redirectUrl) : '/login/first-time';

          if (!this.authJwt?.loginFirstTime) {
            setTimeout(() => {
              this._router.navigateByUrl(redirectFirstTime).then(() => {
                this.loading = false;
              //  this.closeDialog();
              //this.openSnackBarLFT();
              });
            }, 500);
          } else {
            setTimeout(() => {
              this._router.navigateByUrl(redirect).then(() => {
                this.loading = false;
               // this.closeDialog();
              // this.openSnackBar();
              });
            }, 500);
          }

        } else {
          this.closeDialog();
          console.log("401");
          this.loading = false;
          this.isError = true;
        }


      }, (error: HttpErrorResponse) => {

        console.log(error);

        this.closeDialog();
        this.loading = false;
        this.isError = true;
        this.openDialogAlertError(error);
        this.errorResponse = error;


      });

  }

  loadingPasswordForgotEmail(data: any) {
    return this._http.post<HttpResponse<any>>(environment.usersService + '/api/v1/users/auth/login/password/forgot/email',
      data, {observe: 'response'});
  }

  loadingPasswordForgotOtp(data: any) {
    return this._http.post<HttpResponse<any>>(environment.usersService + '/api/v1/users/auth/login/password/forgot/otp',
      data, {observe: 'response'});

  }

  loadingPasswordForgotChange(data: any) {
    return this._http.post<HttpResponse<any>>(environment.usersService + '/api/v1/users/auth/login/password/forgot/change',
      data, {observe: 'response'});

  }

  loadingLogout() {

    this.loading = true;

    const dialogRef = this._dialog.open(AuthLogoutDialogComponent, {
      hasBackdrop: false,
      width: '330px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    setTimeout(() => {
      this.isLoggedIn = false;
      this.removeJWT();
      this.loading = false;
      this.closeDialog();
      this.clearAll();
      this._router.navigateByUrl('/login');
    }, 500);

  }

  openSnackBar() {
    this._snackBar.openFromComponent(AuthSuccessDialogComponent, {
      duration: this.durationInSeconds * 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    //window.location.reload();
  }

  openSnackBarLFT() {
    this._snackBar.openFromComponent(LoginFirstTimeDialogComponent, {
      duration: this.durationInSeconds * 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openDialogAlertError(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(AuthErrorDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        error: error,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.isError = false;
    });

  }


  openDialogAlertPasswordForgotEmailError(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(AuthPasswordForgotEmailErrorDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        error: error,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.isError = false;
    });

  }

  openLoadingDialog(): void {

    const dialogRef = this._dialog.open(AuthLoginDialogComponent, {
      hasBackdrop: false,
      width: '320px',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openLoadingPasswordForgotEmailDialog(): void {

    const dialogRef = this._dialog.open(AuthPasswordForgotEmailDialogComponent, {
      hasBackdrop: false,
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

  getUsername() {

    let username = null;

    if (typeof sessionStorage !== 'undefined') {
      // @ts-ignore
      let token = sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
      this.authJwt = new JwtHelperService().decodeToken(token);

      if (this.authJwt && this.authJwt.username) {
        username = this.authJwt.username.split("@")[0];
      }

      // @ts-ignore
      return username;
    } else {
      return username;
    }

  }

  getUserFullName() {

    let fullName = null;

    if (typeof sessionStorage !== 'undefined') {
      // @ts-ignore
      let token = sessionStorage.getItem('typeToken') + sessionStorage.getItem('accessToken');
      this.authJwt = new JwtHelperService().decodeToken(token);

      if (this.authJwt && this.authJwt.username) {
        fullName = this.authJwt.firstName +" "+ this.authJwt.lastName;
      }

      // @ts-ignore
      return fullName;
    } else {
      return fullName;
    }

  }

  //AUTHORIZATION

  getAuthGroups(): any {
    // @ts-ignore
    return this.authJwt.groups;
  }

  getAuthRoles(): any {
    // @ts-ignore
    return this.authJwt.roles;
  }

  getAuthPermissions(): any {
    // @ts-ignore
    return this.authJwt.permissions;
  }

}
