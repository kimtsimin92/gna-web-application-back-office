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
import {NgIf} from "@angular/common";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {EditorModule} from "primeng/editor";
import {
  GuaranteeClauseEditorDialogComponent
} from "../guarantee-clause-editor-dialog/guarantee-clause-editor-dialog.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

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
    MatRadioGroup
  ],
  templateUrl: './guarantee-add.component.html',
  styleUrl: './guarantee-add.component.css'
})
export class GuaranteeAddComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  formData: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: GuaranteeForm = new GuaranteeForm();

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  guaranteeData: any = null;
  loadingPage: boolean = false;

  periodList: any[] = []
  zoneList: any[] = []
  partnerList: any[] = []

  guaranteeClauses: any;

  //
 // subscriptionMinimumPeriod: number = 1;
  //subscriptionMaximumPeriod: number = 2;

  isLoadingList: boolean = false;
  isDisable: boolean = true;

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

    this.headerTitle = "Garanties";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


    if (localStorage.getItem("GUARANTEE_DATA")) {
      // @ts-ignore
      this.guaranteeData = JSON.parse(localStorage.getItem("GUARANTEE_DATA"));
    }

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Configuration Produits' }, { label: 'Garanties'}, {label: "Création"}];


    this.formData = this._fb.group(this.dataForm);

    this.onGetPeriodList();
    this.onGetZoneList();
    this.onGetPartnerList();

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
      width: '380px',
      height: '200px',
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
      discountApplicable: this.formData.value.discountApplicable,
      zoneId: this.formData.value.zone,
      partnerIds: this.formData.value.partners,
      description: this.formData.value.description,
      clauses: this.guaranteeClauses,
      enabled: this.formData.value.enabled
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
      width: '440px',
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
      width: '440px',
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

}
