import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {PartnerSaveForm} from "../partner-save-form";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
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
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";

@Component({
  selector: 'app-partner-edit',
  standalone: true,
  imports: [
    BreadcrumbModule,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlideToggle,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    KeyFilterModule
  ],
  templateUrl: './partner-edit.component.html',
  styleUrl: './partner-edit.component.css'
})
export class PartnerEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: PartnerSaveForm = new PartnerSaveForm();
  dataEnabled: 'false' | 'true' = 'true';
  typeList: any[] = [];
  groupList: any[] = [];

  modeEdit: boolean = false;
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  partnerData: any = null;
  isDisable: boolean = true;


  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("PARTNER_DATA")) {
      // @ts-ignore
      this.partnerData = JSON.parse(localStorage.getItem("PARTNER_DATA"));
      this.modeEdit = true;
    } else {
      this._router.navigateByUrl("/account/partners/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Partenaires";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Partenaires'}, {label: "Modification"}];

    if (localStorage.getItem("PARTNER_DATA")) {
      // @ts-ignore
      this.partnerData = JSON.parse(localStorage.getItem("PARTNER_DATA"));
      this.dataForm.code.setValue(this.partnerData.code);
      this.dataForm.name.setValue(this.partnerData.name);
      if (this.partnerData.address) {
        this.dataForm.address.setValue(this.partnerData.address);
      }
      if (this.partnerData.phone) {
        this.dataForm.phone.setValue(this.partnerData.phone);
      }
      if (this.partnerData.email) {
        this.dataForm.email.setValue(this.partnerData.email);
      }

      if (this.partnerData.type) {
        this.dataForm.typeId.setValue(this.partnerData.type.name);
      }

      if (this.partnerData.group) {
        this.dataForm.groupId.setValue(this.partnerData.group.name);
      }

    } else {
      this._router.navigateByUrl("/account/partners/list")
    }


    this.onGetTypeList();
    this.onGetGroupList();

    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("PARTNER_DATA")) {
      localStorage.removeItem("PARTNER_DATA");
    }
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

  private openSaveEdit() {

    this.isSave = true;
    console.log(this.formData.value);

    this.openSaveEditLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      address: this.formData.value.address,
      phone: this.formData.value.phone,
      email: this.formData.value.email,
      typeId: null,
      groupId: null
    }

    if (this.formData.value.typeId) {
      if (this.typeList.length > 0) {
        this.typeList.forEach((t: any) => {
          if (t.name === this.formData.value.typeId) {
            requestData.typeId = t.id;
          }
        });
      }
    }

    if (this.formData.value.groupId) {
      if (this.groupList.length > 0) {
        this.groupList.forEach((g: any) => {
          if (g.name === this.formData.value.groupId) {
            requestData.groupId = g.id;
          }
        });
      }
    }

    let id = this.partnerData.id;

    console.log(requestData);

    this.accountService.savePartnerEdit(requestData, id)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.openSaveEditNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveEditErrorNotificationDialog(error);
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
        dialogMessage: "La modification du partenaire a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/partners/list")
        .then(() => {
        });


    });

  }

  openSaveEditErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du partenaire a échoué."
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

  openConfirmEdit(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de ce partenaire"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.openSaveEdit();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onGetNotBlankAlert() {
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {});
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

}
