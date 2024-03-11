import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {LoginForm} from "../../form/login-form";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {
  AuthPasswordForgotEmailDialogComponent
} from "../../auth-dialog/auth-password-forgot-email-dialog/auth-password-forgot-email-dialog.component";
import {
  AuthPasswordForgotEmailErrorDialogComponent
} from "../../auth-dialog/auth-password-forgot-email-error-dialog/auth-password-forgot-email-error-dialog.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {LoginFirstTimeForm} from "../../form/login-first-time-form";
import {
  SaveNotificationDialogComponent
} from "../../../account/dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../account/dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {AuthSuccessDialogComponent} from "../../auth-dialog/auth-success-dialog/auth-success-dialog.component";
import {AccountService} from "../../../account/account.service";
import {
  LoginFirstTimeLoadingDialogComponent
} from "../../auth-dialog/login-first-time-loading-dialog/login-first-time-loading-dialog.component";
import {InputTextModule} from "primeng/inputtext";
import {StepsModule} from "primeng/steps";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-password-forgot',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    MatStep,
    MatStepper,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    NgForOf,
    RouterLink,
    InputTextModule,
    StepsModule,
  ],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.css'
})
export class PasswordForgotComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  disableRipple: boolean = true;

  hide = true;
  loading: boolean = false;

  firstFormGroup = this._fb.group({
    email: [null, [Validators.email, Validators.required]]});

  secondFormGroup = this._fb.group({
    code1: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]],
    code2: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]],
    code3: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]],
    code4: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]],
    code5: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]],
    code6: [null, [Validators.minLength(1), Validators.maxLength(1), Validators.required]]
  });


  thirdFormGroup: FormGroup = new FormGroup({}, undefined, undefined);
  profileFormPwd: LoginFirstTimeForm = new LoginFirstTimeForm();

  otpCode: any = null;
  otpToken: any = null;

  isStep1: boolean = false;
  isStep2: boolean = false;
  isStep3: boolean = false;

  isSave: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 10;

  hideNew = true;
  hideConfirm = true;

  //
  items: MenuItem[] | undefined;
  activeIndex: number = 0;

  constructor(
    private _fb: FormBuilder,
    public auth: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {

    if (this.auth.isAuth()) {
      this._router.navigateByUrl("/account/home");
    }

    this.items = [
      {
        label: 'Vérification compte',
        routerLink: 'personal'
      },
      {
        label: 'Code OTP',
        routerLink: 'seat'
      },
      {
        label: 'Mot de passe',
        routerLink: 'payment'
      }
    ];


    this.disableRipple = true;

  }

  onVerifiedEmail() {

    console.log(this.firstFormGroup.value);

   this.openLoadingPasswordForgotEmailDialog();

    let dataRequest = this.firstFormGroup.value;

    this.otpToken = null;

    this.auth.loadingPasswordForgotEmail(dataRequest)
      .subscribe(response => {

        console.log(response['body']);
        this.otpToken = response['body'];

        this.auth.loading = false;
        this.closeDialog();

        this.isStep1 = true;

        this.stepper.next();

      }, (error: HttpErrorResponse) => {

        console.log(error);
        this.auth.loading = false;
        this.closeDialog();
        this.openDialogAlertPasswordForgotEmailError(error);

      });


  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  onValidatedOtp() {

    if (this.otpToken) {

      console.log(this.secondFormGroup.value);

      // @ts-ignore
      let code = this.secondFormGroup.value.code1+this.secondFormGroup.value.code2+this.secondFormGroup.value.code3
        +this.secondFormGroup.value.code4+this.secondFormGroup.value.code5+this.secondFormGroup.value.code6;

      let otpCode = Number(code);
      console.info(otpCode);

      this.openLoadingPasswordForgotEmailDialog();

      let dataRequest = {
        code: otpCode,
        token: this.otpToken.token
      }

      console.log(dataRequest);

      this.auth.loadingPasswordForgotOtp(dataRequest)
        .subscribe(response => {

          console.log(response['body']);
          this.otpToken = response['body'];
          this.otpCode = otpCode;

          this.auth.loading = false;
          this.closeDialog();

          this.isStep2 = true;

          this.thirdFormGroup = this._fb.group(this.profileFormPwd);

          this.stepper.next();

        }, (error: HttpErrorResponse) => {

          console.log(error);
          this.auth.loading = false;
          this.closeDialog();
          this.openDialogAlertPasswordForgotEmailError(error);

        });


    }

  }


  moveOTP(e: any, p:any, c: any, n:any) {

    let length = c.value.length;
    let maxlength = c.getAttribute('maxlength');

    if (length == maxlength) {
      if (n != "") {
        n.focus();
      }
    }

    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }

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

  getErrorMessagePasswordNew() {
    return this.profileFormPwd.passwordNew.hasError('required') ? '' :
      this.profileFormPwd.passwordNew.invalid ? "Le mot de passe doit avoir au moins 8 caractères alphanumériques avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.": '';
  }

  getErrorMessagePasswordConfirm() {
    return this.profileFormPwd.passwordConfirm.hasError('required') ? '' :
      this.profileFormPwd.passwordConfirm.invalid ? "Le mot de passe confirmé ne correspond pas au nouveau mot de passe.": '';
  }


  onPasswordCompare() {
    if (this.thirdFormGroup.value.passwordOld == this.thirdFormGroup.value.passwordNew) {
      this.thirdFormGroup.controls['passwordNew'].setErrors({'incorrect': true});
    }
    if (this.thirdFormGroup.value.passwordNew !== this.thirdFormGroup.value.passwordConfirm) {
      this.thirdFormGroup.controls['passwordConfirm'].setErrors({'incorrect': true});
    }
  }

  openSavePasswordNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du mot de passe a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isSave = false;

        this._router.navigateByUrl("/login").then(() => {
        });

    });

  }


  openSavePasswordErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du mot de passe a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
      }

    });

  }


  openChangePassword() {

    this.isSave = true;
    this.openLoadingDialog();

    let requestData = {
      code: this.otpCode,
      token: this.otpToken.token,
      passwordNew: this.thirdFormGroup.value.passwordNew,
      passwordConfirm: this.thirdFormGroup.value.passwordConfirm
    }

    console.log(requestData);

    this.auth.loadingPasswordForgotChange(requestData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        this.auth.clearAll();
        this.hideNew = true;
        this.hideConfirm = true;
        this.openSavePasswordNotificationDialog();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.closeDialog();
        this.openSavePasswordErrorNotificationDialog(error);
      });

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

}
