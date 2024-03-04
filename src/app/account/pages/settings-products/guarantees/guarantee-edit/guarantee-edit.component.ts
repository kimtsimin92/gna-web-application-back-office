import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
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
import {GuaranteeForm} from "../guarantee-form";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  GuaranteeClauseEditorDialogComponent
} from "../guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {GuaranteeItemForm} from "../guarantee-item-form";
import {ButtonModule} from "primeng/button";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {AddLoadingDialogComponent} from "../../../../dialogs/loading/add-loading-dialog/add-loading-dialog.component";
import {DecimalPipe, NgIf} from "@angular/common";
import {
  ConfirmationRemoveDialogComponent
} from "../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {KeyFilterModule} from "primeng/keyfilter";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-guarantee-edit',
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
        MatRadioButton,
        MatRadioGroup,
        MatSelect,
        MatTab,
        MatTabGroup,
        ReactiveFormsModule,
        ButtonModule,
        DecimalPipe,
        NgIf,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        KeyFilterModule,
        MultiSelectModule
    ],
  templateUrl: './guarantee-edit.component.html',
  styleUrl: './guarantee-edit.component.css'
})
export class GuaranteeEditComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  formDataItem: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: GuaranteeForm = new GuaranteeForm();
  dataItemForm: GuaranteeItemForm = new GuaranteeItemForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guarantee: any = null;
  guaranteeItem: any = null;
  guaranteeItemsData: any[] = [];

  periodList: any[] = [];
  zoneList: any[] = [];
  partnerList: any[] = [];

  guaranteeClauses: any;

  isDisable: boolean = true;

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

    if (localStorage.getItem("GUARANTEE_DATA")) {
      // @ts-ignore
      this.guarantee = JSON.parse(localStorage.getItem("GUARANTEE_DATA"));
    } else {
      this._router.navigateByUrl("/account/guarantees/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Configuration Produits' }, { label: 'Garanties'}, {label: "Modification"}];

    if (localStorage.getItem("GUARANTEE_DATA")) {

      this.onGetPeriodList();
      this.onGetZoneList();
      this.onGetPartnerList();
      this.onGetItems();

      // @ts-ignore
      this.guarantee = JSON.parse(localStorage.getItem("GUARANTEE_DATA"));
      this.dataForm.code.setValue(this.guarantee.code);
      this.dataForm.name.setValue(this.guarantee.name);
      this.dataForm.taxRate.setValue(this.guarantee.taxRate);
      this.dataForm.franchiseRate.setValue(this.guarantee.franchiseRate);
      this.dataForm.franchiseMinimum.setValue(this.guarantee.franchiseMinimum);
      this.dataForm.franchiseMaximum.setValue(this.guarantee.franchiseMaximum);
      this.dataForm.subscriptionMinimumPeriod.setValue(this.guarantee.subscriptionMinimumPeriod);
      this.dataForm.subscriptionMaximumPeriod.setValue(this.guarantee.subscriptionMaximumPeriod);
      this.dataForm.deficiencyDeadline.setValue(this.guarantee.deficiencyDeadline);

      if (this.guarantee.deficiencyDeadlineUnit) {
        this.dataForm.deficiencyDeadlineUnit.setValue(this.guarantee.deficiencyDeadlineUnit.name);
      }

      this.dataForm.guaranteeFloor.setValue(this.guarantee.guaranteeFloor);
      this.dataForm.guaranteeCeiling.setValue(this.guarantee.guaranteeCeiling);
      this.dataForm.premiumMinimum.setValue(this.guarantee.premiumMinimum);

      if (this.guarantee.discountApplicable) {
        // @ts-ignore
        this.dataForm.discountApplicable.setValue("Oui");
      } else {
        // @ts-ignore
        this.dataForm.discountApplicable.setValue("Nom");
      }

      if (this.guarantee.zone) {
        this.dataForm.zone.setValue(this.guarantee.zone.name);
      }

      if (this.guarantee.partners) {
        if (this.guarantee.partners.length > 0) {
          let partnerIds: any[] = [];
          this.guarantee.partners.forEach((p: any) => {
            partnerIds.push(p.name);
          });
          // @ts-ignore
          this.dataForm.partners.setValue(partnerIds);
        }
      }
      this.dataForm.description.setValue(this.guarantee.description);
      this.dataForm.clauses.setValue(this.guarantee.clauses);
      this.guaranteeClauses = this.guarantee.clauses;

    } else {
      this._router.navigateByUrl("/account/guarantees/list")
    }

    this.formData = this._fb.group(this.dataForm);
    this.formDataItem = this._fb.group(this.dataItemForm);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("GUARANTEE_DATA")) {
      localStorage.removeItem("GUARANTEE_DATA");
    }
    this.guaranteeClauses = null;
  }

  onBack() {
    this._router.navigateByUrl("/account/guarantees/list");
  }

  private onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    let requestData = {
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
      clauses: this.guaranteeClauses
    }

    if (this.formData.value.discountApplicable && this.formData.value.discountApplicable == "Oui") {
      // @ts-ignore
      requestData.discountApplicable = true;
    } else {
      // @ts-ignore
      requestData.discountApplicable = false;
    }

    if (this.formData.value.partners) {
      let partners = this.formData.value.partners;
      if (partners.length > 0) {
        partners.forEach((p: any) => {
          if (this.partnerList.length > 0) {
            this.partnerList.forEach((pl: any) => {
              if (p === pl.name) {
                // @ts-ignore
                requestData.partnerIds.push(pl.id);
              }
            });
          }
        });
      }
    }

    if (this.formData.value.zone) {
      let zone = this.formData.value.zone;
          if (this.zoneList.length > 0) {
            this.zoneList.forEach((zl: any) => {
              if (zone === zl.name) {
                // @ts-ignore
                requestData.zoneId = zl.id;
              }
        });
      }
    }

    let id = this.guarantee.id;

    console.log(requestData);

    this.accountService.editGuarantee(requestData, id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.guarantee = responseData["body"];
        // @ts-ignore
        localStorage.setItem("GUARANTEE_DATA", JSON.stringify(this.guarantee));
        this.closeDialog();
        this.onSaveNotificationDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        console.log(errorData);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(errorData);
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

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "La modification de la garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/guarantees/list")
        .then(() => {
      this.guarantee = null;
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
        dialogMessage: "La modification de la garantie a échoué."
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
      data: {guaranteeClauses: this.guaranteeClauses},
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


  //

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

  onSaveItemLoadingDialog(): void {

    const dialogRef = this._dialog.open(AddLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  onEditItem(item: any) {
    this.guaranteeItem = item;
    this.dataItemForm.id.setValue(item.id);
    this.dataItemForm.name.setValue(item.name);
    this.dataItemForm.code.setValue(item.code);
    this.dataItemForm.capital.setValue(item.capital);
    this.dataItemForm.franchiseRate.setValue(item.franchiseRate);
    this.dataItemForm.franchiseMinimum.setValue(item.franchiseMinimum);
    this.dataItemForm.franchiseMaximum.setValue(item.franchiseMaximum);
  }

  onAddNew() {
    this.guaranteeItem = null;
    this.dataItemForm = new GuaranteeItemForm();
    this.formDataItem = this._fb.group(this.dataItemForm);
    this.onGetItems();
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

}
