import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
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
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {GuaranteeForm} from "../guarantee-form";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DecimalPipe, NgIf} from "@angular/common";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {EditorModule} from "primeng/editor";
import {
  GuaranteeClauseEditorDialogComponent
} from "../guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";
import {GuaranteeItemForm} from "../guarantee-item-form";
import {
  ConfirmationRemoveDialogComponent
} from "../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {AddLoadingDialogComponent} from "../../../../dialogs/loading/add-loading-dialog/add-loading-dialog.component";

@Component({
  selector: 'app-guarantee-add',
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
    MatOption,
    MatSelect,
    MatHint,
    MatError,
    NgIf,
    MatTab,
    MatTabGroup,
    EditorModule,
    MatRadioButton,
    MatRadioGroup,
    InputTextModule,
    KeyFilterModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
    DecimalPipe
  ],
  templateUrl: './guarantee-add.component.html',
  styleUrl: './guarantee-add.component.css'
})
export class GuaranteeAddComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: GuaranteeForm = new GuaranteeForm();

  formDataItem: FormGroup = new FormGroup({}, undefined, undefined);
  dataItemForm: GuaranteeItemForm = new GuaranteeItemForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guaranteeData: any = null;
  loadingPage: boolean = false;

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

  periodList: any[] = [];
  zoneList: any[] = [];
  partnerList: any[] = [];

  guaranteeClauses: any;

  //
 // subscriptionMinimumPeriod: number = 1;
  //subscriptionMaximumPeriod: number = 2;

  isLoadingList: boolean = false;
  isDisable: boolean = true;

  guarantee: any = null;
  guaranteeItem: any = null;
  guaranteeItemsData: any[] = [];

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

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    if (localStorage.getItem("GUARANTEE_DATA")) {
      // @ts-ignore
      this.guaranteeData = JSON.parse(localStorage.getItem("GUARANTEE_DATA"));
    }

    this.onGetPeriodList();
    this.onGetZoneList();
    this.onGetPartnerList();

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Configuration Produits' }, { label: 'Garanties'}, {label: "Création"}];


    this.formData = this._fb.group(this.dataForm);
    this.formDataItem = this._fb.group(this.dataItemForm);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.guaranteeClauses = null;
  }

  onBack() {
    this._router.navigateByUrl("/account/guarantees/list");
  }

  onConfirm(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de cette garantie"
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
      taxRate: this.formData.value.taxRate,
      franchiseRate: this.formData.value.franchiseRate,
      franchiseMinimum: this.formData.value.franchiseMinimum,
      franchiseMaximum: this.formData.value.franchiseMaximum,
      deficiencyDeadlineUnitCode: this.formData.value.deficiencyDeadlineUnit,
      deficiencyDeadline: this.formData.value.deficiencyDeadline,
      subscriptionMinimumPeriod: this.formData.value.subscriptionMinimumPeriod,
      subscriptionMaximumPeriod: this.formData.value.subscriptionMaximumPeriod,
      guaranteeFloor: this.formData.value.guaranteeFloor,
      guaranteeCeiling: this.formData.value.guaranteeCeiling,
      premiumMinimum: this.formData.value.premiumMinimum,
      discountApplicable: null,
      zoneId: null,
      partnerIds: [],
      description: this.formData.value.description,
      clauses: this.guaranteeClauses,
      enabled: this.formData.value.enabled
    }

    if (this.formData.value.discountApplicable) {
      requestData.discountApplicable = this.formData.value.discountApplicable.value;
    }

    if (this.formData.value.zone) {
      requestData.zoneId = this.formData.value.zone.id;
    }

    if (this.formData.value.partners) {
      let partners = this.formData.value.partners;
      if (partners.length > 0) {
        partners.forEach((p: any) => {
          // @ts-ignore
          requestData.partnerIds.push(p.id);
        });
      }
    }

    console.log(requestData);

    this.accountService.addGuarantee(requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        console.log(responseData);
        this.guaranteeData = responseData["body"];
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
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement de cette garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/guarantees/edit")
        .then(() => {
          // @ts-ignore
          localStorage.setItem("GUARANTEE_DATA", JSON.stringify(this.guaranteeData));
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
        dialogMessage: "L'enregistrement de cette garantie a échoué."
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
      height: '340px',
    });

    dialogRef.afterClosed().subscribe(result => {});
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

  onGetZoneList() {
    this.accountService.pageLoading = true;
    this.accountService.getZoneList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.zoneList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  onGetPartnerList() {
    this.accountService.pageLoading = true;
    this.accountService.getPartnerList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.partnerList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
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

  onEditItemSG(item: any) {
    this.guaranteeItem = item;
    this.dataItemForm.id.setValue(item.id);
    this.dataItemForm.name.setValue(item.name);
    this.dataItemForm.code.setValue(item.code);
    this.dataItemForm.capital.setValue(item.capital);
    this.dataItemForm.franchiseRate.setValue(item.franchiseRate);
    this.dataItemForm.franchiseMinimum.setValue(item.franchiseMinimum);
    this.dataItemForm.franchiseMaximum.setValue(item.franchiseMaximum);
  }

  onSaveRemoveLoadingDialog(): void {

    const dialogRef = this._dialog.open(RemoveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onConfirmRemove(data: any): void {

    this.guaranteeItem = data;
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de la sous garantie " + data.name
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        if (this.guarantee.id && this.guaranteeItem.id) {
          this.onSaveRemove();
        } else {
          this.guaranteeItem = null;
          this.onGetNotBlankAlert();
        }
      } else {
        this.guaranteeItem = null;
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  private onSaveRemove() {

    this.isSave = true;

    this.onSaveRemoveLoadingDialog();

    this.accountService.removeGuaranteeItem(this.guarantee.id, this.guaranteeItem.id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onSaveRemoveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveRemoveErrorNotificationDialog(error);
      });

  }

  onSaveRemoveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "La suppression de la sous garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        this.onGetItems();
      } else {
        this.onGetItems();
      }

    });


  }


  onSaveRemoveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        httpError: error,
        dialogMessage: "La suppression de la sous garantie a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onGetItems() {
    this.accountService.pageLoading = true;
    let guaranteeId = this.guarantee.id;
    this.accountService.getGuaranteeItems(guaranteeId)
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.guaranteeItemsData = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  onConfirmItem(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de cette sous garantie"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveItem();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }


  onSaveItemNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "L'enregistrement de la sous garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        this.guaranteeItem = null;
        this.dataItemForm = new GuaranteeItemForm();
        this.formDataItem = this._fb.group(this.dataItemForm);
        this.onGetItems();
      }

    });

  }

  onSaveItemErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        httpError: error,
        dialogMessage: "L'enregistrement de la sous garantie a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onSaveItemLoadingDialog(): void {

    const dialogRef = this._dialog.open(AddLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onSaveItem() {
    console.log(this.formDataItem.value);
    this.isSave = true;
    this.onSaveItemLoadingDialog();

    let guaranteeId = this.guarantee.id;

    let requestData = {
      guaranteeCode: this.guarantee.code,
      id: this.formDataItem.value.id,
      code: this.formDataItem.value.code,
      name: this.formDataItem.value.name,
      capital: this.formDataItem.value.capital,
      franchiseRate: this.formDataItem.value.franchiseRate,
      franchiseMinimum: this.formDataItem.value.franchiseMinimum,
      franchiseMaximum: this.formDataItem.value.franchiseMaximum
    }

    console.log(requestData);

    this.accountService.addGuaranteeItem(requestData, guaranteeId)
      .subscribe((responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.onSaveItemNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveItemErrorNotificationDialog(errorData);
      });

  }

}
