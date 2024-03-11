import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProductGroupForm} from "../product-group-form";
import {MenuItem, SharedModule} from "primeng/api";
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
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {KeyValuePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-product-group-edit',
  standalone: true,
    imports: [
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        KeyFilterModule,
        KeyValuePipe,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatDivider,
        MultiSelectModule,
        PaginatorModule,
        ReactiveFormsModule,
        SharedModule,
        InputTextareaModule
    ],
  templateUrl: './product-group-edit.component.html',
  styleUrl: './product-group-edit.component.css'
})
export class ProductGroupEditComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: ProductGroupForm = new ProductGroupForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guaranteeData: any = null;
  loadingPage: boolean = false;

  periodList: any[] = [];
  branchList: any[] = [];
  guaranteeList: any[] = [];

  guaranteeClauses: any;

  isDisable: boolean = true;
  isReadonly: boolean = true;

  paymentMethodList: any[] = [
    {
      id: 1,
      name: "Unique"
    },
    {
      id: 2,
      name: "Périodique"
    }
  ];

  periodicityList: any[] = [
    {
      id: 1,
      name: "Mensuel"
    },
    {
      id: 2,
      name: "Trimestriel"
    },
    {
      id: 3,
      name: "Semestriel"
    },
    {
      id: 4,
      name: "Annuel"
    }
  ];

  insuranceSectorList: any[] = [
    {
      id: 1,
      name: "Vie"
    },
    {
      id: 2,
      name: "Non vie"
    },
    {
      id: 3,
      name: "Mix"
    }
  ];

  apiList: any[] = [
    {
      id: 1,
      name: "Attestation Automobile"
    },
    {
      id: 2,
      name: "Attestation CEDEAO"
    },
    {
      id: 3,
      name: "Attestation Voyage"
    }
  ];

  selectGuaranteeList: any[] = [];
  branchCode: any = null;
  guaranteeCode: any = null;
  productGroup: any = null;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("PRODUCT_GROUP_DATA")) {
      // @ts-ignore
      this.productGroup = JSON.parse(localStorage.getItem("PRODUCT_GROUP_DATA"));
    } else {
      this._router.navigateByUrl("/account/products-groups/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Groupes Produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    this.home = {icon: 'pi pi-home', routerLink: '/account/home'};

    this.items = [{label: 'Configuration Produits'}, {label: 'Groupes Produits'}, {label: "Création"}];

    if (localStorage.getItem("PRODUCT_GROUP_DATA")) {

      this.onGetBranchList();
      this.onGetPeriodList();
      this.onGetGuaranteeList();

      // @ts-ignore
      this.productGroup = JSON.parse(localStorage.getItem("PRODUCT_GROUP_DATA"));
      this.dataForm.code.setValue(this.productGroup.code);
      this.dataForm.name.setValue(this.productGroup.name);
      this.dataForm.description.setValue(this.productGroup.description);

      if (this.productGroup.branch) {
        this.dataForm.branchId.setValue(this.productGroup.branch.name);
      }

      if (this.productGroup.accessoryAmountCompany) {
        this.dataForm.accessoryAmountCompany.setValue(this.productGroup.accessoryAmountCompany);
      }

      if (this.productGroup.accessoryAmountIntermediate) {
        this.dataForm.accessoryAmountIntermediate.setValue(this.productGroup.accessoryAmountIntermediate);
      }

      if (this.productGroup.accessoryTaxRate) {
        this.dataForm.accessoryTaxRate.setValue(this.productGroup.accessoryTaxRate);
      }

      if (this.productGroup.paymentMethod) {
        this.dataForm.paymentMethodId.setValue(this.productGroup.paymentMethod.name);
      }

      if (this.productGroup.periodicity) {
        this.dataForm.periodicityId.setValue(this.productGroup.periodicity.name);
      }

      if (this.productGroup.insuranceSector) {
        this.dataForm.insuranceSectorId.setValue(this.productGroup.insuranceSector.name);
      }

      if (this.productGroup.apis) {
        if (this.productGroup.apis.length > 0) {
          let apiIds: any[] = [];
          this.productGroup.apis.forEach((a: any) => {
            apiIds.push(a.name);
          });
          // @ts-ignore
          this.dataForm.apiIds.setValue(apiIds);
        }
      }

      this.dataForm.managementMode.setValue(this.productGroup.managementMode);
      this.dataForm.insuredMultiple.setValue(this.productGroup.insuredMultiple);
      this.dataForm.coverageRate.setValue(this.productGroup.coverageRate);

      if (this.productGroup.guarantees) {
        if (this.productGroup.guarantees.length > 0) {
          this.productGroup.guarantees.forEach((g: any) => {
            if (!this.selectGuaranteeList[g.id]) {
              this.selectGuaranteeList[g.id] = g;
              // @ts-ignore
              this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));
            }
          });
        }
      }

    } else {
      this._router.navigateByUrl("/account/products-groups/list");
    }

    this.formData = this._fb.group(this.dataForm);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("PRODUCT_GROUP_DATA")) {
      localStorage.removeItem("PRODUCT_GROUP_DATA");
    }
    this.productGroup = null;
  }

  onBack() {
    this._router.navigateByUrl("/account/products-groups/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de ce groupe produit"
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
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  private onSave() {

    this.isSave = true;
    console.log(this.formData.value);

    this.onSaveLoadingDialog();

    let id = this.productGroup.id;

    let requestData = {
      name: this.formData.value.name,
      accessoryTaxRate: this.formData.value.accessoryTaxRate,
      accessoryAmountCompany: this.formData.value.accessoryAmountCompany,
      accessoryAmountIntermediate: this.formData.value.accessoryAmountIntermediate,
      coverageRate: this.formData.value.coverageRate,
      managementMode: this.formData.value.managementMode,
      insuredMultiple: this.formData.value.insuredMultiple,
      paymentMethodName: this.formData.value.paymentMethodId,
      periodicityName: this.formData.value.periodicityId,
      insuranceSectorName: this.formData.value.insuranceSectorId,
      apiIds: [],
      guarantees: [],
      branchName: this.formData.value.branchId,
      description: this.formData.value.description
    }

    if (this.selectGuaranteeList && this.selectGuaranteeList.length > 0) {
      // @ts-ignore
      this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));
    }

    if (this.formData.value.guarantees.value) {
      requestData.guarantees = this.formData.value.guarantees.value;
    }

    if (this.formData.value.apiIds) {
      let apiIds = this.formData.value.apiIds;
      if (apiIds.length > 0) {
        apiIds.forEach((api: any) => {
          if (this.apiList.length > 0) {
            this.apiList.forEach((al: any) => {
              if (api === al.name) {
                // @ts-ignore
                requestData.apiIds.push(al.id);
              }
            });
          }
        });
      }
    }

    console.log(requestData);

    this.accountService.editProductGroup(requestData, id)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.onSaveNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
      });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "La modification de ce groupe produit a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/products-groups/list")
        .then(() => {
          this.loadingPage = false;
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        httpError: error,
        dialogMessage: "La modification de ce groupe produit a échoué."
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
    // Trigger validation by marking all controls as touched
    this.formData.markAllAsTouched();
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '400px',
      height: '340px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onGetPeriodList() {
    this.accountService.pageLoading = true;
    this.accountService.getPeriodList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.periodList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
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

  onGetGuaranteeList() {
    this.accountService.pageLoading = true;
    this.accountService.getGuaranteeList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.guaranteeList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }



  onAddGuaranteeToTable() {
    if (!this.selectGuaranteeList[this.guaranteeCode.id]) {
      this.guaranteeCode.mandatory = false;
      this.selectGuaranteeList[this.guaranteeCode.id] = this.guaranteeCode;
      // @ts-ignore
      this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));
    }

  }

  onSelectGuarantee(guarantee: any) {
    console.log(guarantee);
    this.guaranteeCode = guarantee;
  }

  onRemoveGuaranteeFromList(selectGuarantee: any) {
    if (this.selectGuaranteeList[selectGuarantee.id]) {
      delete this.selectGuaranteeList[selectGuarantee.id];
    }
  }

}
