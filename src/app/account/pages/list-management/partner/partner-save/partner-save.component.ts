import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {KeyValuePipe, NgIf} from "@angular/common";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {PartnerSaveForm} from "../partner-save-form";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {KeyFilterModule} from "primeng/keyfilter";
import {MatDivider} from "@angular/material/divider";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-partner-save',
  standalone: true,
  imports: [
    BreadcrumbModule,
    FormsModule,
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
    MatSlideToggle,
    NgIf,
    ReactiveFormsModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    KeyValuePipe,
    MatDivider,
    MultiSelectModule
  ],
  templateUrl: './partner-save.component.html',
  styleUrl: './partner-save.component.css'
})
export class PartnerSaveComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: PartnerSaveForm = new PartnerSaveForm();
  typeList: any[] = [];
  groupList: any[] = [];

  modeEdit: boolean = false;
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  partnerData: any = null;
  loadingPage: boolean = false;
  isDisable: boolean = true;


  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des listes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetTypeList();
    this.onGetGroupList();

    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
  }

  onBack() {
    this._router.navigateByUrl("/account/partners/list");
  }

  onGetTypeList() {
    this.accountService.getPartnerTypeList()
      .subscribe((responseData) => {
        console.info(responseData)
        // @ts-ignore
        this.typeList = responseData["body"];
      }, (errorData) => {
        console.info(errorData);
      });

  }

  onGetGroupList() {
    this.accountService.getPartnerGroupList()
      .subscribe((responseData) => {
        console.info(responseData)
        // @ts-ignore
        this.groupList = responseData["body"];
      }, (errorData) => {
        console.info(errorData);
      });

  }

  openConfirmAdd(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: "de ce partenaire"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.openSaveAdd();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  openSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  private openSaveAdd() {

    this.isSave = true;
    console.log(this.formData.value);

    this.openSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      address: this.formData.value.address,
      phone: this.formData.value.phone,
      email: this.formData.value.email,
      typeId: null,
      groupId: null
    }

    if (this.formData.value.typeId) {
      requestData.typeId = this.formData.value.typeId.id;
    }

    if (this.formData.value.groupId) {
      requestData.groupId = this.formData.value.groupId.id;
    }

    console.log(requestData);

    this.accountService.savePartnerAdd(requestData)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.partnerData = responseData["body"];
        this.closeDialog();
        this.openSaveNotificationDialog();

      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveErrorNotificationDialog(error);
      });

  }

  openSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement du partenaire a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/partners/list")
        .then(() => {
          // @ts-ignore
          localStorage.setItem("PARTNER_DATA", JSON.stringify(this.partnerData));
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
        dialogMessage: "L'enregistrement du partenaire a échoué."
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


  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
