import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserSaveForm} from "../../users-manager/forms/user-save-form";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";

@Component({
  selector: 'app-user-management-edit',
  standalone: true,
    imports: [
        BreadcrumbModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './user-management-edit.component.html',
  styleUrl: './user-management-edit.component.css'
})
export class UserManagementEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formProfile: FormGroup = new FormGroup({}, undefined, undefined);
  profileForm: UserSaveForm = new UserSaveForm();

  isSave: boolean = false;

  genders: any[] = [
    {value: 'H', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'},
  ];

  userTypes: any[] = [
    {value: 1, viewValue: 'Interne'},
    {value: 2, viewValue: 'Externe'},
  ];

  userProfiles: any[] = [
    {value: "P1", viewValue: 'Gestionnaire Marketing'},
    {value: "P2", viewValue: 'Admin'},
  ];

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  userData: any = null;
  userAccountData: any = null;

  profileList: any[] = [];
  profilesByUserType: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    this.userData = this.accountService.getUserData();

    this.items = [{ label: 'Paramètres' }, { label: 'Utilisateurs' }, { label: 'Modification' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };


    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Utilisateurs";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetProfileList();

    if (localStorage.getItem("USER_ACCOUNT_DATA")) {
      // @ts-ignore
      this.userAccountData = JSON.parse(localStorage.getItem("USER_ACCOUNT_DATA"));
      this.profileForm.firstName.setValue(this.userAccountData.firstName);
      this.profileForm.lastName.setValue(this.userAccountData.lastName);
      this.profileForm.gender.setValue(this.userAccountData.gender);
      this.profileForm.address.setValue(this.userAccountData.address);
      this.profileForm.email.setValue(this.userAccountData.email);
      this.profileForm.phone.setValue(this.userAccountData.phone);
      this.profileForm.userType.setValue(this.userAccountData.type.code);
      this.profileForm.userProfile.setValue(this.userAccountData.profile.id);
      // @ts-ignore
      this.profileForm.enabled.setValue(""+this.userAccountData.enabled);
    } else {
      this._router.navigateByUrl("/account/settings/users")
    }

    this.formProfile = this._fb.group(this.profileForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("USER_ACCOUNT_DATA")) {
      localStorage.removeItem("USER_ACCOUNT_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/users");
  }

  getErrorMessageFirstNane() {
    return this.profileForm.firstName.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileForm.firstName.invalid ? "Veuillez entrer un nom valide.": '';
  }

  getErrorMessageLastNane() {
    return this.profileForm.lastName.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileForm.lastName.invalid ? "Veuillez entrer un prénom valide.": '';
  }

  getErrorMessageEmail() {
    return this.profileForm.email.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileForm.email.invalid ? "Veuillez entrer un e-mail valide.": '';
  }

  getErrorMessagePhone() {
    return this.profileForm.phone.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.profileForm.phone.invalid ? "Veuillez entrer un numéro de téléphone à 10 chiffres.": '';
  }

  openSaveUserEdit() {
    this.isSave = true;
    console.log(this.formProfile.value);
    this.openSaveEditLoadingDialog();

    let requestData = {
      token: this.accountService.getToken(),
      id: this.userAccountData.id,
      username: this.userAccountData.username,
      firstName: this.formProfile.value.firstName,
      lastName: this.formProfile.value.lastName,
      gender: this.formProfile.value.gender,
      address: this.formProfile.value.address,
      email: this.formProfile.value.email,
      phone: this.formProfile.value.phone,
      userType: this.formProfile.value.userType,
      profileId: this.formProfile.value.userProfile,
      enabled: this.formProfile.value.enabled
    }

    this.accountService.managerEditUserAccount(requestData)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.userAccountData = responseData["body"];
        // @ts-ignore
        localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(this.userAccountData));
        this.closeDialog();
        this.openSaveEditNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveEditErrorNotificationDialog(error);
      });

  }

  openConfirmEdit(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: "de ce compte utilisateur"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.openSaveUserEdit();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveEditLoadingDialog(): void {

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openSaveEditNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du compte utilisateur a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveEditErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du compte utilisateur a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onGetProfileList() {
    this.accountService.getProfileList()
      .subscribe((responseData) => {
        console.info(responseData)
        // @ts-ignore
        this.profileList = responseData["body"];
        this.profilesByUserType = this.profileList;
      }, (errorData) => {
        console.info(errorData);
      });

  }


  onGetProfileByUserType(type: any) {

    if (this.profileList && this.profileList.length > 0) {

      this.profilesByUserType = [];

      this.profileList.forEach(p => {

        if (p.type && p.type.code === type.value) {
          this.profilesByUserType.push(p);
        }

      });

    }

  }

}
