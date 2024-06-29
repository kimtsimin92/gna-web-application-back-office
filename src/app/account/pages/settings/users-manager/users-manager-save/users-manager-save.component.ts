import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem} from "@angular/material/list";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {UserSaveForm} from "../forms/user-save-form";
import {MatOption, MatSelect} from "@angular/material/select";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {InputTextModule} from "primeng/inputtext";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {DropdownModule} from "primeng/dropdown";
import {InputMaskModule} from "primeng/inputmask";

@Component({
  selector: 'app-users-manager-save',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatButton,
    MatDivider,
    MatList,
    MatListItem,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    BreadcrumbModule,
    MatSlideToggle,
    FormsModule,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule,
    InputMaskModule
  ],
  templateUrl: './users-manager-save.component.html',
  styleUrl: './users-manager-save.component.css'
})
export class UsersManagerSaveComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;


  isDisable: boolean = true;

  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  formProfile: FormGroup = new FormGroup({}, undefined, undefined);
  profileForm: UserSaveForm = new UserSaveForm();

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

    this.headerTitle = "Gestion Utilisateurs";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    if (localStorage.getItem("USER_ACCOUNT_DATA")) {
      this.modeEdit = false;
      // @ts-ignore
      this.userAccountData = JSON.parse(localStorage.getItem("USER_ACCOUNT_DATA"));
      this.profileForm.firstName.setValue(this.userAccountData.firstName);
      this.profileForm.lastName.setValue(this.userAccountData.lastName);
      this.profileForm.gender.setValue(this.userAccountData.gender);
      this.profileForm.email.setValue(this.userAccountData.email);
      this.profileForm.phone.setValue(this.userAccountData.phone);
      this.profileForm.userProfile.setValue(this.userAccountData.profile.id);
    } else {
      this.modeEdit = true;
    }

    this.formProfile = this._fb.group(this.profileForm);
    this.onGetProfileList();

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
    this._router.navigateByUrl("/account/admin/users/interns/list");
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

  openSaveUserAdd() {
    this.isSave = true;
    console.log(this.formProfile.value);
    this.openSaveLoadingDialog();

    let requestData = {
      token: this.accountService.getToken(),
      firstName: this.formProfile.value.firstName,
      lastName: this.formProfile.value.lastName,
      gender: null,
      email: this.formProfile.value.email,
      phone: this.formProfile.value.phone,
      profileId: null,
    }


    if (this.formProfile.value.gender) {
      requestData.gender = this.formProfile.value.gender.value;
    }


    if (this.formProfile.value.userProfile) {
      requestData.profileId = this.formProfile.value.userProfile.id;
    }

    this.accountService.managerAddUserAccount(requestData)
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
        dialogMessage: "de ce compte utilisateur"
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

      this._router.navigateByUrl("/account/admin/users/interns/list").then(() => {
        // @ts-ignore
        localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(this.userAccountData));
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
        dialogMessage: "L'enregistrement du compte utilisateur a échoué."
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
