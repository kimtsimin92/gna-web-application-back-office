import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChipModule} from "primeng/chip";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { AccountService } from '../../../../account.service';
import { ManagerCustomerAccountService } from '../../../manager-customers-accounts/manager-customer-account.service';
import { ConfirmationToggleDialogComponent } from '../../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component';
import { SaveLoadingDialogComponent } from '../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';


import { TagModule } from 'primeng/tag';
import { environment } from '../../../../../../environments/environment';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-expertise-reject-view',
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
    SkeletonModule,
    TagModule,
    NgForOf,
  ],
  templateUrl: './expertise-reject-view.component.html',
  styleUrl: './expertise-reject-view.component.css'
})
export class ExpertiseRejectViewComponent implements OnInit, AfterViewInit, OnDestroy {

  isSave: boolean = false;

  elementData: any;
  loadingPage: boolean = false;
  loading: boolean = false;

  protected readonly environment = environment;
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
      this._router.navigateByUrl("/account/expertise/requests/rejects/list")
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
    this._router.navigateByUrl("/account/expertise/requests/rejects/list");
  }


  onGetCustomerAccountFilesById(elementData: any) {
    this.isLoadingFiles = true;

    let filters = {
      user_id: elementData.id,
    };

    this.managerCustomerAccountService
      .onGetCustomerAccountFilesById(filters)
      .subscribe(
        (responseData: HttpResponse<any>) => {
          this.isLoadingFiles = false;
          console.log(responseData);

          let responseBody = responseData['body'];

          elementData.files = responseBody.data;
        },
        (errorData: HttpErrorResponse) => {
          this.isLoadingFiles = false;

          console.log(errorData);
        }
      );
  }
}
