import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ProfileForm} from "./profile-form/profile-form";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationEditDialogComponent
} from "../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {SaveLoadingDialogComponent} from "../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {Router} from "@angular/router";
import {
  SaveErrorNotificationDialogComponent
} from "../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {ProfilePasswordForm} from "./profile-form/profile-password-form";
import {MatIcon} from "@angular/material/icon";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {EditLoadingDialogComponent} from "../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [
        MatCard,
        MatCardTitle,
        MatCardHeader,
        MatCardSubtitle,
        MatCardContent,
        MatDivider,
        MatTabGroup,
        MatTab,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgIf,
        MatButton,
        MatSlideToggle,
        FormsModule,
        MatError,
        MatIcon,
        MatSuffix,
        BreadcrumbModule,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;
  userData: any = null;
  modeEditInfo: boolean = false;
  modeEditPwd: boolean = false;
  isDisable: boolean = true;

  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  formProfile: FormGroup = new FormGroup({}, undefined, undefined);
  profileForm: ProfileForm = new ProfileForm();

  formProfilePwd: FormGroup = new FormGroup({}, undefined, undefined);
  profileFormPwd: ProfilePasswordForm = new ProfilePasswordForm();

  isSave: boolean = false;


  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("USER_PROFILE_DATA")) {
      // @ts-ignore
      this.userData = JSON.parse(localStorage.getItem("USER_PROFILE_DATA"));
      if (this.userData.gender) {
        if (this.userData.gender === "H") {
          this.userData.gender = "Homme";
        } else if (this.userData.gender === "F") {
          this.userData.gender = "Femme";
        }
      }
    } else {
      this._router.navigateByUrl('/account/home');
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Mon Profil";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.items = [{ label: 'Compte' }, { label: 'Profil' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.profileForm.phone.setValue(this.userData.phone);
    this.formProfile = this._fb.group(this.profileForm);

    this.formProfilePwd = this._fb.group(this.profileFormPwd);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("USER_PROFILE_DATA")) {
      localStorage.removeItem("USER_PROFILE_DATA");
    }
  }

  getErrorMessagePhone() {
    return this.profileForm.phone.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileForm.phone.invalid ? "Veuillez entrer un numéro de téléphone à 10 chiffres.": '';
  }

  getErrorMessagePasswordOld() {
    return this.profileFormPwd.passwordOld.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileFormPwd.passwordOld.invalid ? "Le mot de passe doit avoir au moins 8 caractères alphanumériques avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.": '';
  }

  getErrorMessagePasswordNew() {
    return this.profileFormPwd.passwordNew.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileFormPwd.passwordNew.invalid ? "Le mot de passe doit avoir au moins 8 caractères alphanumériques avec au moins une majuscule, une minuscule, un chiffre, un caractère spécial et doit être différent de l'ancien mot de passe.": '';
  }

  getErrorMessagePasswordConfirm() {
    return this.profileFormPwd.passwordConfirm.hasError('required') ? 'Vous devez entrer une valeur.' :
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

  openConfirmEditProfile(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '360px',
      height: '200px',
      data: {
        dialogMessage: "du numéro de téléphone"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onEditProfile();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openConfirmEditProfilePassword(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '360px',
      height: '200px',
      data: {
        dialogMessage: "du mot de passe"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onEditProfilePassword();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onEditProfile() {

    this.openSaveLoadingDialog();
    console.info(this.formProfile);
    let requestData = {
      id: this.userData.id,
      token: this.accountService.getToken(),
      username: this.accountService.getUsername(),
      phone: this.formProfile.value.phone
    }
    console.log(requestData);

    this.accountService.editUserProfile(requestData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        localStorage.removeItem("USER_PROFILE_DATA");
        this.userData = responseData["body"];
        localStorage.setItem("USER_PROFILE_DATA", JSON.stringify(this.userData));
          this.accountService.pageLoading = false;
          this.openSaveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.closeDialog();
        this.accountService.pageLoading = false;
        this.openSaveErrorNotificationDialog(error);
      });

  }

  onEditProfilePassword() {

    this.openSavePasswordLoadingDialog();
    console.info(this.formProfilePwd);

    let requestData = {
      id: this.userData.id,
      token: this.accountService.getToken(),
      username: this.accountService.getUsername(),
      passwordOld: this.formProfilePwd.value.passwordOld,
      passwordNew: this.formProfilePwd.value.passwordNew,
      passwordConfirm: this.formProfilePwd.value.passwordConfirm
    }
    console.log(requestData);

    this.accountService.editUserProfilePassword(requestData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.closeDialog();
        localStorage.removeItem("USER_PROFILE_DATA");
        this.userData = responseData["body"];
        localStorage.setItem("USER_PROFILE_DATA", JSON.stringify(this.userData));
          this.accountService.pageLoading = false;
          this.openSavePasswordNotificationDialog();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.closeDialog();
        this.accountService.pageLoading = false;
        this.openSavePasswordErrorNotificationDialog(error);
      });

  }

  openSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
      data: {
        dialogMessage: "du numéro de téléphone"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openSavePasswordLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
      data: {
        dialogMessage: "du mot de passe"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du numéro de téléphone a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

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
        this.modeEditPwd = false;
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        this.hideOld = true;
        this.hideNew = true;
        this.hideConfirm = true;

    });

  }

  openSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du numéro de téléphone a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

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
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openNotificationErrorDialog(): void {

    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.closeDialog();
      }
    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }


}
