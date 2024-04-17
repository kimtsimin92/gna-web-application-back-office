import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormControlState, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {ProductGroupForm} from "../product-group-form";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import {DecimalPipe, KeyValuePipe, NgClass, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {CheckboxModule} from "primeng/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-product-group-add',
  standalone: true,
  imports: [
    BreadcrumbModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    MatTab,
    MatTabGroup,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
    DecimalPipe,
    MatCheckbox,
    KeyValuePipe,
    InputTextModule,
    KeyFilterModule,
    CheckboxModule,
    MatDivider,
    NgIf,
    NgClass,
    MultiSelectModule,
    InputTextareaModule
  ],
  templateUrl: './product-group-add.component.html',
  styleUrl: './product-group-add.component.css'
})
export class ProductGroupAddComponent implements OnInit, OnDestroy, AfterViewInit {

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
  selectGuarantee: any = null;
  branchCode: any = null;
  guaranteeCode: any = null;

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

    this.headerTitle = "Groupes Produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    this.home = {icon: 'pi pi-home', routerLink: '/account/home'};

    this.items = [{label: 'Configuration Produits'}, {label: 'Groupes Produits'}, {label: "Création"}];


    this.formData = this._fb.group(this.dataForm);

    this.onGetBranchList();
    this.onGetPeriodList();
    this.onGetGuaranteeList();

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.guaranteeClauses = null;
  }

  onBack() {
    this._router.navigateByUrl("/account/products-groups/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
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

    let requestData = {
      name: this.formData.value.name,
      accessoryTaxRate: this.formData.value.accessoryTaxRate,
      accessoryAmountCompany: this.formData.value.accessoryAmountCompany,
      accessoryAmountIntermediate: this.formData.value.accessoryAmountIntermediate,
      coverageRate: this.formData.value.coverageRate,
      managementMode: this.formData.value.managementMode,
      insuredMultiple: this.formData.value.insuredMultiple,
      paymentMethodId: null,
      periodicityId: null,
      insuranceSectorId: null,
      apiIds: [],
      guarantees: [],
      branchId: null,
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
          // @ts-ignore
          requestData.apiIds.push(api.id);
        });
      }
    }

    if (this.formData.value.branchId) {
      requestData.branchId = this.formData.value.branchId.id;
    }

    if (this.formData.value.paymentMethodId) {
      requestData.paymentMethodId = this.formData.value.paymentMethodId.id;
    }

    if (this.formData.value.periodicityId) {
      requestData.periodicityId = this.formData.value.periodicityId.id;
    }

    if (this.formData.value.insuranceSectorId) {
      requestData.insuranceSectorId = this.formData.value.insuranceSectorId.id;
    }

    console.log(requestData);

    this.accountService.addProductGroup(requestData)
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
        dialogMessage: "L'enregistrement de ce groupe produit a réussi."
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
        dialogMessage: "L'enregistrement de ce groupe produit a échoué."
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


  /*  onSelectGuarantee(guarantee: any) {
      if (this.selectGuaranteeList[guarantee.id]) {
        delete this.selectGuaranteeList[guarantee.id];
      } else {
        this.selectGuaranteeList[guarantee.id] = guarantee;
        this.guaranteeCode = guarantee.code;
      }
    } */

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
