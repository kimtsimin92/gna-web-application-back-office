import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChipModule} from "primeng/chip";
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {TagModule} from "primeng/tag";
import {SkeletonModule} from "primeng/skeleton";
import { ConfirmationToggleDialogComponent } from '../../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component';
import { environment } from '../../../../../../environments/environment';
import { AccountService } from '../../../../account.service';
import { ManagerCustomerAccountService } from '../../manager-customer-account.service';
import { SaveLoadingDialogComponent } from '../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-management-customer-account-personal-view',
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
    SkeletonModule,
    CurrencyPipe,
    DecimalPipe,
    ButtonModule,
    InputSwitchModule,
    MatMenu,
    MatMenuItem,
    RippleModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './management-customer-account-personal-view.component.html',
  styleUrl: './management-customer-account-personal-view.component.css'
})
export class ManagementCustomerAccountPersonalViewComponent  implements OnInit, AfterViewInit, OnDestroy{

  isSave: boolean = false;

  customerSegment: any = null;

  elementData: any;
  loadingPage: boolean = false;
  loading: boolean = false;

  insuredList: any[] = [];

  protected readonly environment = environment;
  isLoadingFiles: boolean = false;

  showViewEdit: boolean = false;
  segmentList: any[] = [];

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
      let customerAccountData = JSON.parse(localStorage.getItem("CUSTOMER_ACCOUNT_REQUEST_DATA"));

      if (customerAccountData) {
        this.onGetCustomerAccountById(customerAccountData.id);
        if (customerAccountData.segment) {
          this.customerSegment = customerAccountData.segment;
        }
      }

    } else {
      this._router.navigateByUrl("/account/managements/accounts/personals/list")
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
    this._router.navigateByUrl("/account/management/customers/accounts/personals/list");
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

      this._router.navigateByUrl("/account/managements/accounts/personals/list")
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

  onConfirmToggleEnabled(data: any, isToggle: boolean): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    let insuredCode = "";

    if(data.numero_assure) {
      insuredCode = data.numero_assure;
    }

    const dialogRef = this._dialog.open(
      ConfirmationToggleEnableDialogComponent,
      {
        hasBackdrop: false,
        width: '400px',
        height: '400px',
        data: {
          dialogMessage: "le compte assuré "  + insuredCode,
          isToggle: isToggle,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveToggleEnable(data);
      } else {
        data.is_active = !data.is_active;
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  private onSaveToggleEnable(data: any) {
    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.saveInsuredToggleEnable(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
        this.insuredList = [];
        this.closeDialog();
        this.openSaveToggleEnableNotificationDialog();
      },
      (error: HttpErrorResponse) => {
        this.isSave = false;
        data.is_active = !data.is_active;
        console.log(error);
        this.closeDialog();
        this.openSaveToggleEnableErrorNotificationDialog(error);
      }
    );
  }


  openSaveToggleEnableNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: "L'opération a réussi.",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });

    this.onGetCustomerAccountById(this.elementData.id);

  }

  openSaveToggleEnableErrorNotificationDialog(error: HttpErrorResponse): void {
    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "L'opération a échoué.",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  openSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onGetSegmentByCode(item: any) {

    this.loadingPage = true;
    this.loading = true;

    this.accountService.getSegmentByCode(item.code_segment)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;


        console.log(responseData);

        let responseBody = responseData['body'];

        if (responseBody) {
          item.segment = responseBody;
        }

      }, (errorData: HttpErrorResponse) => {

        this.loadingPage = false;
        this.loading = false;


        console.log(errorData);

      });

  }

  onGetCustomerAccountById(id: number) {

    this.loadingPage = true;
    this.loading = true;


    this.managerCustomerAccountService
      .onGetCustomerAccountById(id)
      .subscribe(
        (responseData: HttpResponse<any>) => {

          this.loadingPage = false;
          this.loading = false;

          console.log(responseData);
          let responseBody = responseData['body'];
          if (responseBody) {
            this.elementData = responseBody.data;
            if (this.elementData.assures) {
              this.insuredList = this.elementData.assures;
            }
          }

        },
        (errorData: HttpErrorResponse) => {
          this.loadingPage = false;
          this.loading = false;

          console.log(errorData);
        }
      );
  }

  onGetInsuredList(id: number) {

    this.loadingPage = true;
    this.loading = true;

    let filter = {
      created_user: id,
    };


    this.managerCustomerAccountService
      .onGetCustomerAccountInsureds(
        filter
      )
      .subscribe(
        (responseData: HttpResponse<any>) => {
          this.loadingPage = false;
          this.loading = false;

          console.log(responseData);
          let responseBody = responseData['body'];

          if (responseBody) {
            this.insuredList = responseBody.data;
          }

        },
        (errorData: HttpErrorResponse) => {
          this.loadingPage = false;
          this.loading = false;

          console.log(errorData);
        }
      );
  }


  onShowViewEdit() {

    if (this.elementData) {
      if (this.elementData.segment) {
        this.customerSegment = this.elementData.segment;
      }
    }
    this.onGetSegmentList();
    this;this.showViewEdit = true;
  }

  onGetSegmentList() {
    this.accountService.pageLoading = true;
    this.accountService.getSegmentList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.segmentList = responseData["body"];
      }, (errorData: HttpErrorResponse) => {
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  onCustomerEditSegment() {

    let requestData = {
      customerId: this.elementData.id,
      codeSegment: this.customerSegment.code,
    }

    console.log(requestData);

    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.saveEditCustomerSegment(requestData.customerId, requestData).subscribe(
      (responseData) => {
        this.isSave = false;
        console.log(responseData);
        this.closeDialog();
        this.openSaveToggleEnableNotificationDialog();
      },
      (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveToggleEnableErrorNotificationDialog(error);
      }
    );

  }

}
