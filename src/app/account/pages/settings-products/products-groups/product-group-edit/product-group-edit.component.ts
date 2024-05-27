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
import {MatInput} from "@angular/material/input";
import {
  GuaranteeClauseEditorDialogComponent
} from "../../guarantees/guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";

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
        InputTextareaModule,
        MatInput
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
  selectGuarantee: any = null;
  productGroup: any = null;

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


  guaranteeCode: any = null;


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

      if (this.productGroup.guarantees) {
        if (this.productGroup.guarantees.length > 0) {
          this.productGroup.guarantees.forEach((g: any) => {
            if (!this.selectGuaranteeList[g.guaranteeId]) {
              this.selectGuaranteeList[g.guaranteeId] = g;
              // @ts-ignore
              this.dataForm.guarantees.setValue(new FormControl(this.selectGuaranteeList));
            }
          });
        }
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

      this.dataForm.coverageRate.setValue(this.productGroup.coverageRate);
      this.dataForm.maturityNotice.setValue(this.productGroup.maturityNotice);
      this.dataForm.clauses.setValue(this.productGroup.clauses);

      this.guaranteeClauses = this.productGroup.clauses;

      if (this.productGroup.managementMode) {
        // @ts-ignore
        this.dataForm.managementMode.setValue("Oui");
      } else {
        // @ts-ignore
        this.dataForm.managementMode.setValue("Non");
      }

      if (this.productGroup.beneficiaries) {
        // @ts-ignore
        this.dataForm.beneficiaries.setValue("Oui");
      } else {
        // @ts-ignore
        this.dataForm.beneficiaries.setValue("Non");
      }

      if (this.productGroup.coverageRate) {
        // @ts-ignore
        this.dataForm.coverageRate.setValue("Oui");
      } else {
        // @ts-ignore
        this.dataForm.coverageRate.setValue("Non");
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
      guarantees: [],
      branchName: this.formData.value.branchId,
      insuranceSectorName: this.formData.value.insuranceSectorId,
      paymentMethodName: this.formData.value.paymentMethodId,
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

        let guaranteeList = responseData["body"];

        if (guaranteeList && guaranteeList.length > 0 && this.selectGuaranteeList && this.selectGuaranteeList.length > 0) {
          this.guaranteeList = [];
          guaranteeList.forEach((gl: any) => {
            if (!this.selectGuaranteeList[gl.id]) {
              this.guaranteeList.push(gl);
            }
          });
        } else {
          this.guaranteeList = guaranteeList;
        }

      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  onAddGuaranteeToTable() {
    console.log(this.selectGuarantee);
    if (!this.selectGuaranteeList[this.selectGuarantee.id]) {
      this.guaranteeCode = this.selectGuarantee;
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

/*  onAddGuaranteeToTable() {

    console.log(this.selectGuarantee);
    console.log(this.selectGuaranteeList);
    console.log(this.selectGuaranteeList[this.selectGuarantee.id]);

    if (!this.selectGuaranteeList[this.selectGuarantee.id]) {

      let selectedGuarantee = {
        guaranteeId: this.selectGuarantee.id,
        guaranteeCode: this.selectGuarantee.code,
        guaranteeName: this.selectGuarantee.name,
        mandatory: false,
      }

      this.selectGuaranteeList[selectedGuarantee.guaranteeId] = selectedGuarantee;

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

  }*/

  onSelectGuarantee(guarantee: any) {
    this.selectGuarantee = guarantee;
  }

  onRemoveGuaranteeFromList(selectGuarantee: any) {

    if (this.selectGuaranteeList[selectGuarantee.guaranteeId]) {
      delete this.selectGuaranteeList[selectGuarantee.guaranteeId];
      let gl = {
        id: selectGuarantee.guaranteeId,
        code: selectGuarantee.guaranteeCode,
        name: selectGuarantee.guaranteeName,
        mandatory: false,
      }
      this.guaranteeList.push(gl);
    } else if (this.selectGuaranteeList[selectGuarantee.id]) {
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

}
