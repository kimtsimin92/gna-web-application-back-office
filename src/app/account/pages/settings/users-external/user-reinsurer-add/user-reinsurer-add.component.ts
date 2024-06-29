import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {DividerModule} from "primeng/divider";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

@Component({
  selector: 'app-user-reinsurer-add',
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
  templateUrl: './user-reinsurer-add.component.html',
  styleUrl: './user-reinsurer-add.component.css'
})
export class UserReinsurerAddComponent implements OnInit, OnDestroy {

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
    this._router.navigateByUrl("/account/admin/users/external/reinsurers/list");
  }

  openSaveUserAdd() {
    this.isSave = true;
    console.log(this.formProfile.value);
    this.openSaveLoadingDialog();

    let requestData = {
      token: this.accountService.getToken(),
      code: this.formProfile.value.code,
      name: this.formProfile.value.name,
      phone: this.formProfile.value.phone,
      email: this.formProfile.value.email,
      userFirstName: this.formProfile.value.userFirstName,
      userLastName: this.formProfile.value.userLastName,
      userEmail: this.formProfile.value.userEmail,
      userPhone: this.formProfile.value.userPhone,
      profileCode: 3,
    }

    console.log("REQUEST SAVE REINSURER DATA");
    console.log(requestData);

    this.accountService.managerAddUserExternalAccount(requestData)
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

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: "de ce compte réassureur"
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

      this._router.navigateByUrl("/account/admin/users/external/reinsurers/list").then(() => {
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
        dialogMessage: "L'enregistrement du compte réassureur a échoué."
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
