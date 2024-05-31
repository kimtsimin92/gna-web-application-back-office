import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
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
import {ZoneForm} from "../zone-form";
import {InputTextModule} from "primeng/inputtext";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";

@Component({
  selector: 'app-zone-edit',
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
        ReactiveFormsModule,
        InputTextModule
    ],
  templateUrl: './zone-edit.component.html',
  styleUrl: './zone-edit.component.css'
})
export class ZoneEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: ZoneForm = new ZoneForm();
  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  branchData: any = null;


  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("ZONE_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("ZONE_DATA"));
    } else {
      this._router.navigateByUrl("/account/settings/lists/zones/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Territoires";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/settings/lists/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Territoires'}, {label: "Modification"}];

    if (localStorage.getItem("ZONE_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("ZONE_DATA"));
      this.dataForm.code.setValue(this.branchData.code);
      this.dataForm.name.setValue(this.branchData.name);
    } else {
      this._router.navigateByUrl("/account/settings/lists/zones/list")
    }

    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("ZONE_DATA")) {
      localStorage.removeItem("ZONE_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/zones/list");
  }

  private onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name
    }

    let id = this.branchData.id;

    console.log(requestData);

    this.accountService.saveZoneEdit(requestData, id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onSaveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      });

  }

  onSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La modification du territoire a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings/lists/zones/list")
        .then(() => {
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La modification du territoire a échoué."
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

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: "de ce territoire"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSave();
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


}
