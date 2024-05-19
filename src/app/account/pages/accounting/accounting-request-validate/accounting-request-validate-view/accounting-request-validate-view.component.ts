import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {ChipModule} from "primeng/chip";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {TagModule} from "primeng/tag";
import {SkeletonModule} from "primeng/skeleton";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {ManagerCustomerAccountService} from "../../../manager-customers-accounts/manager-customer-account.service";
import {
  ConfirmationToggleDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-accounting-request-validate-view',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    ChipModule,
    MatCardContent,
    NgIf,
    DatePipe,
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    EditorModule,
    TagModule,
    NgForOf,
    SkeletonModule
  ],
  templateUrl: './accounting-request-validate-view.component.html',
  styleUrl: './accounting-request-validate-view.component.css'
})
export class AccountingRequestValidateViewComponent  implements OnInit, AfterViewInit, OnDestroy {

  isSave: boolean = false;

  elementData: any;
  loadingPage: boolean = false;
  loading: boolean = false;

  isLoadingFiles: boolean = false;

  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService,
    private managerCustomerAccountService: ManagerCustomerAccountService,) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("CUSTOMER_ACCOUNT_REQUEST_DATA")) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("CUSTOMER_ACCOUNT_REQUEST_DATA"));
    } else {
      this._router.navigateByUrl("/account/accounting/requests/validates/list");
    }

  }


  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("CUSTOMER_ACCOUNT_REQUEST_DATA")) {
      // @ts-ignore
      localStorage.removeItem("CUSTOMER_ACCOUNT_REQUEST_DATA");
    }
  }

  onGoToBack() {
    this._router.navigateByUrl("/account/accounting/requests/validates/list");
  }

  onValid(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationToggleDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "valider ce compte"
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

  onReject(): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationToggleDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "rejeter ce compte"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveReject();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onSaveValid() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    let userId = this.elementData.id;

    let requestData = {
      "validation_status": 2
    };

    this.accountService.onSaveCustomerAccountValid(userId, requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(responseData);
        let message = "L'enregistrement de la validation du compte a reussi."
        this.onSaveNotificationDialog(message);
        this.closeDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(errorData);
        this.closeDialog();
        let message = "L'enregistrement de la validation du compte a échoué";
        this.onSaveErrorNotificationDialog(errorData, message);
      });

  }

  onSaveReject() {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    this.onSaveLoadingDialog();

    let userId = this.elementData.id;

    let requestData = {
      "validation_status": 3
    };

    this.accountService.onSaveCustomerAccountReject(userId, requestData)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(responseData);
        let message = "L'enregistrement du rejet du compte a reussi."
        this.onSaveNotificationDialog(message);
        this.closeDialog();
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(errorData);
        this.closeDialog();
        let message = "L'enregistrement du rejet du compte a échoué";
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

      this._router.navigateByUrl("/account/accounting/requests/validates/list")
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

  onGetCustomerAccountFilesById(elementData: any) {

    this.isLoadingFiles = true;

    let filters = {
      user_id: elementData.id
    };

    this.managerCustomerAccountService.onGetCustomerAccountFilesById(filters)
      .subscribe((responseData: HttpResponse<any>) => {

        this.isLoadingFiles = false;
        console.log(responseData);

        let responseBody = responseData['body'];

        elementData.files = responseBody.data;

      }, (errorData: HttpErrorResponse) => {
        this.isLoadingFiles = false;

        console.log(errorData);

      });

  }

  protected readonly environment = environment;
}

