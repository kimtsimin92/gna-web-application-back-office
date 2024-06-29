import {Component, OnDestroy, OnInit} from '@angular/core';
import {DividerModule} from "primeng/divider";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {UserExternalForm} from "../user-external-form";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";

@Component({
  selector: 'app-user-coinsurer-edit',
  standalone: true,
    imports: [
        DividerModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        ReactiveFormsModule
    ],
  templateUrl: './user-coinsurer-edit.component.html',
  styleUrl: './user-coinsurer-edit.component.css'
})
export class UserCoinsurerEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;


  isDisable: boolean = true;

  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  formProfile: FormGroup = new FormGroup({}, undefined, undefined);
  profileForm: UserExternalForm = new UserExternalForm();

  modeEdit: boolean = false;
  isSave: boolean = false;

  userEnabled: 'false' | 'true' = 'true';

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

  loadingPage: boolean = false;
  isDisabled: boolean = true;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    this.userData = this.accountService.getUserData();

    this.items = [{ label: 'Paramètres' }, { label: 'Utilisateurs' }, { label: 'Création' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };


    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Utilisateurs Externes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    if (localStorage.getItem("USER_EXTERNAL_ACCOUNT_DATA")) {
      this.modeEdit = false;
      // @ts-ignore
      this.userAccountData = JSON.parse(localStorage.getItem("USER_EXTERNAL_ACCOUNT_DATA"));
      this.profileForm.code.setValue(this.userAccountData.companyCode);
      this.profileForm.name.setValue(this.userAccountData.companyName);
      this.profileForm.phone.setValue(this.userAccountData.companyPhone);
      this.profileForm.email.setValue(this.userAccountData.companyEmail);
      this.profileForm.userFirstName.setValue(this.userAccountData.firstName);
      this.profileForm.userLastName.setValue(this.userAccountData.lastName);
      this.profileForm.userPhone.setValue(this.userAccountData.phone);
      this.profileForm.userEmail.setValue(this.userAccountData.email);
    } else {
        this._router.navigateByUrl("/account/admin/users/external/coinsurers/list")
    }

    this.formProfile = this._fb.group(this.profileForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("USER_EXTERNAL_ACCOUNT_DATA")) {
      localStorage.removeItem("USER_EXTERNAL_ACCOUNT_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/admin/users/external/coinsurers/list");
  }

  openSaveUserAdd() {
    this.isSave = true;
    console.log(this.formProfile.value);
    this.openSaveLoadingDialog();

    let requestData = {
      token: this.accountService.getToken(),
      username: this.userAccountData.email,
      code: this.formProfile.value.code,
      id: this.userAccountData.id,
      name: this.formProfile.value.name,
      phone: this.formProfile.value.phone,
      email: this.formProfile.value.email,
      userFirstName: this.formProfile.value.userFirstName,
      userLastName: this.formProfile.value.userLastName,
      userEmail: this.formProfile.value.userEmail,
      userPhone: this.formProfile.value.userPhone,
      profileCode: 2,
    }

    console.log("REQUEST SAVE COINSURER DATA");
    console.log(requestData);

    this.accountService.managerEditUserExternalAccount(requestData)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.userAccountData = responseData["body"];
        this.closeDialog();
        this.openSaveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveErrorNotificationDialog(error);
      });

  }

  openConfirmAdd(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: "de ce compte coassureur"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.openSaveUserAdd();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '400px',
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
        dialogMessage: "L'enregistrement du compte utilisateur a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/admin/users/external/coinsurers/list").then(() => {
        // @ts-ignore
        localStorage.setItem("USER_EXTERNAL_ACCOUNT_DATA", JSON.stringify(this.userAccountData));
        this.loadingPage = false;
      });

    });

  }

  openSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "L'enregistrement du compte coassureur a échoué."
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
      }, (errorData) => {
        console.info(errorData);
      });

  }

  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
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
