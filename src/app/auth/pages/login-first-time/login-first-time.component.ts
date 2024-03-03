import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {LoginFirstTimeForm} from "../../form/login-first-time-form";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../account/account.service";
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth.service";
import {AuthLoginDialogComponent} from "../../auth-dialog/auth-login-dialog/auth-login-dialog.component";
import {
  LoginFirstTimeLoadingDialogComponent
} from "../../auth-dialog/login-first-time-loading-dialog/login-first-time-loading-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../account/dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../account/dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {AuthSuccessDialogComponent} from "../../auth-dialog/auth-success-dialog/auth-success-dialog.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {GnaLoadingComponent} from "../../../account/transitions/gna-loading/gna-loading.component";

@Component({
  selector: 'app-login-first-time',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatStep,
    MatStepLabel,
    MatStepper,
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatSuffix,
    MatError,
    NgIf,
    MatProgressSpinner,
    GnaLoadingComponent
  ],
  templateUrl: './login-first-time.component.html',
  styleUrl: './login-first-time.component.css'
})
export class LoginFirstTimeComponent implements OnInit {

  hideNew = true;
  hideConfirm = true;

  disableRipple: boolean = true;

  form: FormGroup = new FormGroup({}, undefined, undefined);
  hide = true;
  loading: boolean = false;

  formProfilePwd: FormGroup = new FormGroup({}, undefined, undefined);
  profileFormPwd: LoginFirstTimeForm = new LoginFirstTimeForm();

  isSave: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 10;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public auth: AuthService,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {

    this.auth.isAuth();

    if (this.auth.authJwt?.loginFirstTime) {
      this._router.navigateByUrl("/login")
    }

   /* this.accountService.loadingPage = true;
    setTimeout(() => {
      this.accountService.loadingPage = false;
    }, 1000);
*/
    this.formProfilePwd = this._fb.group(this.profileFormPwd);


  }


  getErrorMessagePasswordNew() {
    return this.profileFormPwd.passwordNew.hasError('required') ? '' :
      this.profileFormPwd.passwordNew.invalid ? "Le mot de passe doit avoir au moins 8 caractères alphanumériques avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.": '';
  }

  getErrorMessagePasswordConfirm() {
    return this.profileFormPwd.passwordConfirm.hasError('required') ? '' :
      this.profileFormPwd.passwordConfirm.invalid ? "Le mot de passe confirmé ne correspond pas au nouveau mot de passe.": '';
  }


  onPasswordCompare() {
    if (this.formProfilePwd.value.passwordOld == this.formProfilePwd.value.passwordNew) {
      this.formProfilePwd.controls['passwordNew'].setErrors({'incorrect': true});
    }
    if (this.formProfilePwd.value.passwordNew !== this.formProfilePwd.value.passwordConfirm) {
      this.formProfilePwd.controls['passwordConfirm'].setErrors({'incorrect': true});
    }
  }

  openChangePassword() {

    this.isSave = true;
    this.openLoadingDialog();

    let requestData = {
      token: this.accountService.getToken(),
      id: this.accountService.getId(),
      username: this.accountService.getUsername(),
      passwordNew: this.formProfilePwd.value.passwordNew,
      passwordConfirm: this.formProfilePwd.value.passwordConfirm
    }

    console.log(requestData);

  this.accountService.userFirstTimeChangePassword(requestData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        this.auth.clearAll();
        this.auth.setJWT(responseData['body']);
        this.hideNew = true;
        this.hideConfirm = true;
        this.openSavePasswordNotificationDialog();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.closeDialog();
        this.openSavePasswordErrorNotificationDialog(error);
      });

  }

  onCancel() {
    this.auth.clearAll();
    setTimeout(() => {
      this._router.navigateByUrl("/login");
    }, 50);
  }

  openLoadingDialog(): void {

    const dialogRef = this._dialog.open(LoginFirstTimeLoadingDialogComponent, {
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

  openSavePasswordNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "Le changement de mot de passe a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._router.navigateByUrl("/account/home").then(() => {
          this.isSave = false;
          this.openSnackBar();
        });
      }

    });

  }


  openSavePasswordErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "Le changement de mot de passe a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
      }

    });

  }

  openSnackBar() {
    this._snackBar.openFromComponent(AuthSuccessDialogComponent, {
      duration: this.durationInSeconds * 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    window.location.reload();
  }

}
