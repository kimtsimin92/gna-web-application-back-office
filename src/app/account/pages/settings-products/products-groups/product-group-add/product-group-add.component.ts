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
import {
  GuaranteeClauseEditorDialogComponent
} from "../../guarantees/guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";

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
    InputTextareaModule,
    IconFieldModule,
    InputIconModule
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

  yesOrNoList: any[] = [
    {
      value: true,
      name: "Oui",
    },
    {
      value: false,
      name: "Non",
    },
  ];

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

    this.onGetGuaranteeList();
    this.onGetPeriodList();

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.guaranteeClauses = null;
  }

  onBack() {
    this._router.navigateByUrl("/account/management/products/groups/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
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
      code: this.formData.value.code,
      name: this.formData.value.name,
      accessoryTaxRate: this.formData.value.accessoryTaxRate,
      accessoryAmountCompany: this.formData.value.accessoryAmountCompany,
      accessoryAmountIntermediate: this.formData.value.accessoryAmountIntermediate,
      coverageRate: null,
      managementMode: null,
      beneficiaries: null,
      maturityNotice: this.formData.value.maturityNotice,
      paymentMethodId: null,
      periodicityId: null,
      insuranceSectorId: null,
      apiIds: [],
      guaranteeList: [],
      categoryId: null,
      description: this.formData.value.description,
      clauses: this.guaranteeClauses
    }

    if (this.formData.value.coverageRate) {
      requestData.coverageRate = this.formData.value.coverageRate.value;
    }

    if (this.formData.value.managementMode) {
      requestData.managementMode = this.formData.value.managementMode.value;
    }

    if (this.formData.value.beneficiaries) {
      requestData.beneficiaries = this.formData.value.beneficiaries.value;
    }


    if (this.selectGuaranteeList && this.selectGuaranteeList.length > 0) {
      // @ts-ignore
      this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));
    }

    if (this.formData.value.guarantees.value) {
      requestData.guaranteeList = this.formData.value.guarantees.value;
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

    if (this.formData.value.category) {
      requestData.categoryId = this.formData.value.category.id;
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
      height: '400px',
      data: {
        dialogMessage: "L'enregistrement de ce groupe produit a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/management/products/groups/list")
        .then(() => {
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
      height: '400px',
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
    this.accountService.getCategoryList()
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
    console.log(this.selectGuarantee);
    if (!this.selectGuaranteeList[this.selectGuarantee.id]) {
      this.guaranteeCode = this.selectGuarantee
      this.guaranteeCode.mandatory = false;
      this.selectGuaranteeList[this.guaranteeCode.id] = this.guaranteeCode;
        // @ts-ignore
        this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));

      if (this.guaranteeList && this.guaranteeList.length > 0 && this.selectGuaranteeList && this.selectGuaranteeList.length > 0) {
        let guaranteeList: any[] = [];
        this.guaranteeList.forEach((gl: any) => {
          if (!this.selectGuaranteeList[gl.id]) {
            guaranteeList.push(gl);
          }
        });
        this.guaranteeList = guaranteeList;
      }

      this.selectGuarantee = null;

    } else {
      this.selectGuarantee = null;

  }
  }

  onSelectGuarantee(guarantee: any) {
    console.log(guarantee);
    this.guaranteeCode = guarantee;
  }

  onRemoveGuaranteeFromList(selectGuarantee: any) {
    if (this.selectGuaranteeList[selectGuarantee.id]) {
      delete this.selectGuaranteeList[selectGuarantee.id];
      let gl = {
        id: selectGuarantee.id,
        code: selectGuarantee.code,
        name: selectGuarantee.name,
        mandatory: false,
      }
      this.guaranteeList.push(gl);
    }
  }

  openClauseEditorDialog() {
    const dialogRef = this._dialog.open(GuaranteeClauseEditorDialogComponent, {
      hasBackdrop: false,
      data: {clauses: this.guaranteeClauses},
      width: '900px',
      height: '900'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result && result.length > 0) {
        this.guaranteeClauses = result;
      }
    });
  }

  onGetGuaranteesByCategory(category: any) {
    console.log(category);
    this.selectGuaranteeList = [];
    this.onGetGuaranteeList();
  }

}
