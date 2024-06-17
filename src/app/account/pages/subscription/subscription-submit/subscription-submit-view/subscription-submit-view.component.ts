import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {CurrencyPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {TagModule} from "primeng/tag";
import {AccountService} from "../../../../account.service";
import {MatDialog} from "@angular/material/dialog";
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

@Component({
  selector: 'app-subscription-submit-view',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    TagModule
  ],
  templateUrl: './subscription-submit-view.component.html',
  styleUrl: './subscription-submit-view.component.css'
})
export class SubscriptionSubmitViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  elementData: any = null;

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  isDisable: boolean = true;

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService
  ) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("SUBSCRIPTION_DATA")) {

      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("SUBSCRIPTION_DATA"));

    } else {
      this._router.navigateByUrl("/account/subscriptions/submits/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des souscriptions";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }


  ngOnDestroy(): void {
    localStorage.removeItem("SUBSCRIPTION_DATA");
  }


  onBack() {
    this._router.navigateByUrl("/account/subscriptions/submits/list")
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
        dialogMessage: "valider cette souscription"
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
        dialogMessage: "rejeter cette souscription"
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

    let subscriptionId = this.elementData.id;

    this.accountService.onValidSubscription(subscriptionId)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(responseData);
        let message = "L'enregistrement de la validation de la souscription a reussi."
        this.closeDialog();
        this.onSaveNotificationDialog(message);
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(errorData);
        this.closeDialog();
        let message = "L'enregistrement de la validation de la souscription a échoué";
        this.onSaveErrorNotificationDialog(errorData, message);
      });

  }

  onSaveReject() {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    this.onSaveLoadingDialog();

    let subscriptionId = this.elementData.id;

    this.accountService.onRejectSubscription(subscriptionId)
      .subscribe((responseData: HttpResponse<any>) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(responseData);
        let message = "L'enregistrement du rejet de la souscription a reussi."
        this.closeDialog();
        this.onSaveNotificationDialog(message);
      }, (errorData: HttpErrorResponse) => {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
        console.log(errorData);
        this.closeDialog();
        let message = "L'enregistrement du rejet de la souscription a échoué";
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

      this._router.navigateByUrl("/account/subscriptions/submits/list")
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

}
