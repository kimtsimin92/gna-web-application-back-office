import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {EditorModule} from "primeng/editor";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MultiSelectModule} from "primeng/multiselect";
import {MenuItem, SharedModule} from "primeng/api";
import {TagModule} from "primeng/tag";
import {CoinsuranceForm} from "../coinsurance/coinsurance-form";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../../../auth/auth.service";
import {AccountService} from "../../../account.service";
import {
  ConfirmationToggleDialogComponent
} from "../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {SaveLoadingDialogComponent} from "../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {NotBlankDialogComponent} from "../../../dialogs/not-blank-dialog/not-blank-dialog.component";

import {environment} from "../../../../../environments/environment";
import {ReinsuranceForm} from "./reinsurance-form";

@Component({
  selector: 'app-reinsurance',
  standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        EditorModule,
        FormsModule,
        InputNumberModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MultiSelectModule,
        NgIf,
        ReactiveFormsModule,
        SharedModule,
        TagModule
    ],
  templateUrl: './reinsurance.component.html',
  styleUrl: './reinsurance.component.css'
})
export class ReinsuranceComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  elementData: any = null;

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  isDisable: boolean = true;

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  dataForm: ReinsuranceForm = new ReinsuranceForm();

  reInsurerList: any[] = [];

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public authService: AuthService,
    public accountService: AccountService
  ) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("SUBSCRIPTION_INSURANCE_DATA")) {

      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("SUBSCRIPTION_INSURANCE_DATA"));

    } else {
      this._router.navigateByUrl("/account/subscriptions/submits/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des souscriptions";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetCoInsurerList();


    // @ts-ignore
    this.dataForm.userId.setValue(this.authService.getUserId());
    this.dataForm.subscriptionId.setValue(this.elementData.id);


    this.formGroup = this._fb.group(this.dataForm);

  }


  ngOnDestroy(): void {
    localStorage.removeItem("SUBSCRIPTION_INSURANCE_DATA");
  }


  onBack() {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("SUBSCRIPTION_DATA", JSON.stringify(this.elementData));

    this._router.navigateByUrl("account/subscriptions/submits/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  protected readonly environment = environment;

  onValid(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationToggleDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "envoyer cette demande de réassurance"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveValid();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }


  onSaveValid() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    console.log("RE-INSURANCE REQUEST DATA");

    let subscriptionId = this.elementData.id;

    let requestData = {
      userId: this.formGroup.value.userId,
      subscriptionId: this.formGroup.value.subscriptionId,
      partRetained: this.formGroup.value.partRetained,
      partTreaty: this.formGroup.value.partTreaty,
      needFac: this.formGroup.value.needFac,
      reInsurerIds: [],
      message: this.formGroup.value.message,
      companyName: null
    }

    if (this.formGroup.value.reInsurers) {
      let reInsurers = this.formGroup.value.reInsurers;
      if (reInsurers.length > 0) {
        reInsurers.forEach((ri: any) => {
          // @ts-ignore
          requestData.reInsurerIds.push(ri.id);
          // @ts-ignore
          requestData.companyName = ri.companyName;
        });
      }
    }

    console.log(requestData);

    this.accountService.onSendReInsuranceRequest(requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.isSave = this.isSave;
        console.log(responseData);

        this.onGetData(requestData.subscriptionId);
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(errorData);
        this.closeDialog();
        let message = "L'enregistrement de la demande de résassurance a échoué";
        this.onSaveErrorNotificationDialog(errorData, message);
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


  onSaveNotificationDialog(message: string): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: message
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;

      }

      this._router.navigateByUrl("/account/subscriptions/submits/view")
        .then(() => {
          // @ts-ignore
          this.loadingPage = false;
        });

    });

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse, message: string): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: message
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

  onGoToCoInsurance() {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("SUBSCRIPTION_INSURANCE_DATA", JSON.stringify(this.elementData));

    this._router.navigateByUrl("account/subscriptions/submits/co-insurances/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onGetNotBlankAlert() {
    // Trigger validation by marking all controls as touched
    this.formGroup.markAllAsTouched();
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '400px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onGetCoInsurerList() {

    this.accountService.pageLoading = true;

    let profileCode = 3;
    let pageSort = "companyName";
    let pageOrder = "asc";
    let pageNumber = 0;
    let pageSize = 1000;

    this.accountService.getUsersExternalListData(profileCode, pageSort, pageOrder, pageNumber, pageSize)
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);

        if (responseData["body"].data) {
          this.reInsurerList = responseData["body"].data;
        }
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });

  }

  onGetData(id: number) {

    this.accountService.getSubscriptionSubmitted(id)
      .subscribe((responseData: HttpResponse<any>) => {

        this.isSave = false;

        console.log(responseData);

        let dataResponse =  responseData["body"];

        if (dataResponse) {
          // @ts-ignore
          localStorage.setItem("SUBSCRIPTION_DATA", JSON.stringify(dataResponse));

          this._router.navigateByUrl("account/subscriptions/submits/view");
        }

        let message = "L'envoi de la demande de résassurance a reussi."
        this.closeDialog();
        this.onSaveNotificationDialog(message);

      }, (errorData: HttpErrorResponse) => {

        this.isSave = false;
        console.log(errorData);

        let message = "L'envoi de la demande de résassurance a reussi."
        this.closeDialog();
        this.onSaveNotificationDialog(message);

      });
  }

}
