import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {BranchForm} from "../branch-form";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {CheckboxModule} from "primeng/checkbox";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-branch-add',
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
        DropdownModule,
        InputTextModule,
        KeyFilterModule,
        CheckboxModule,
        IconFieldModule,
        InputIconModule,
        InputTextareaModule
    ],
  templateUrl: './branch-add.component.html',
  styleUrl: './branch-add.component.css'
})
export class BranchAddComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: BranchForm = new BranchForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  branchData: any = null;
  loadingPage: boolean = false;


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

    this.headerTitle = "Paramètres";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    if (localStorage.getItem("BRANCH_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("BRANCH_DATA"));
    }


    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/branches/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
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

  onSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  private onSave() {

    this.isSave = true;
    console.log(this.formData.value);

    this.onSaveLoadingDialog();

    let requestData = {
      name: this.formData.value.name,
      description: this.formData.value.description,
    }

    console.log(requestData);

    this.accountService.saveBranchAdd(requestData)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.branchData = responseData["body"];
        this.closeDialog();
        this.onSaveNotificationDialog();

      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement de la branche a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings/lists/branches/list")
        .then(() => {
          // @ts-ignore
          localStorage.setItem("BRANCH_DATA", JSON.stringify(this.branchData));
          this.loadingPage = false;
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        httpError: error,
        dialogMessage: "L'enregistrement de la branche a échoué."
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
      width: '400px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }


}
