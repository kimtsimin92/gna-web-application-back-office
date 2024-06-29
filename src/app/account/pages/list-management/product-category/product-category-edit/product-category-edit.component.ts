import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MenuItem, SharedModule} from "primeng/api";
import {ProductCategoryForm} from "../product-category-form";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";

@Component({
  selector: 'app-product-category-edit',
  standalone: true,
    imports: [
        DropdownModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        InputTextareaModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        ReactiveFormsModule,
        SharedModule
    ],
  templateUrl: './product-category-edit.component.html',
  styleUrl: './product-category-edit.component.css'
})
export class ProductCategoryEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: ProductCategoryForm = new ProductCategoryForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  elementData: any = null;
  loadingPage: boolean = false;
  isDisable: boolean = true;
  branchList: any[] = [];


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


    if (localStorage.getItem("CATEGORY_DATA")) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("CATEGORY_DATA"));
      this.dataForm.code.setValue(this.elementData.code);
      this.dataForm.name.setValue(this.elementData.name);
      this.dataForm.description.setValue(this.elementData.description);


      if (this.elementData.branch) {
        this.dataForm.branch.setValue(this.elementData.branch.name);
      }

    } else {
      this._router.navigateByUrl("/account/settings/lists/categories/list")
    }

    this.onGetBranchList();

    this.formData = this._fb.group(this.dataForm);

  }

  ngOnDestroy(): void {
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/categories/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: "de cette catégorie"
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
      branchId: null,
    }

    if (this.formData.value.branch) {
      if (this.branchList && this.branchList.length > 0) {
        this.branchList.forEach((item: any) => {
          if (item.name === this.formData.value.branch) {
            requestData.branchId = item.id;
          }
        });
      }
    }
    console.log(requestData);

    this.accountService.saveCategoryEdit(requestData, this.elementData.id)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.elementData = responseData["body"];
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
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: "L'enregistrement de la catégorie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings/lists/categories/list")
        .then(() => {
          // @ts-ignore
          localStorage.setItem("CATEGORY_DATA", JSON.stringify(this.branchData));
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
        dialogMessage: "L'enregistrement de la catégorie a échoué."
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

  onGetBranchList() {
    this.accountService.pageLoading = true;
    this.accountService.getBranchList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.branchList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

}
