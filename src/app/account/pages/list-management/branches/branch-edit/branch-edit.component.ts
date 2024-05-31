import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {BranchForm} from "../branch-form";
import {InputTextModule} from "primeng/inputtext";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-branch-edit',
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
        ReactiveFormsModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        InputTextareaModule
    ],
  templateUrl: './branch-edit.component.html',
  styleUrl: './branch-edit.component.css'
})
export class BranchEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: BranchForm = new BranchForm();
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

    if (localStorage.getItem("BRANCH_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("BRANCH_DATA"));
    } else {
      this._router.navigateByUrl("/account/settings/lists/branches/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des listes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    if (localStorage.getItem("BRANCH_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("BRANCH_DATA"));
      this.dataForm.code.setValue(this.branchData.code);
      this.dataForm.name.setValue(this.branchData.name);
      this.dataForm.description.setValue(this.branchData.description);
    } else {
      this._router.navigateByUrl("/account/settings/lists/branchs/list")
    }

    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("BRANCH_DATA")) {
      localStorage.removeItem("BRANCH_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/branches/list");
  }

  private onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      description: this.formData.value.description,
    }

    let id = this.branchData.id;

    console.log(requestData);

    this.accountService.saveBranchEdit(requestData, id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.branchData = responseData["body"];
        // @ts-ignore
        localStorage.setItem("BRANCH_DATA", JSON.stringify(this.branchData));
        this.dataForm.code.setValue(this.branchData.code);
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
        dialogMessage: "La modification de la branche a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings/lists/branches/list")
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
        dialogMessage: "La modification de la branche a échoué."
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
        dialogMessage: "de cette branche"
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
