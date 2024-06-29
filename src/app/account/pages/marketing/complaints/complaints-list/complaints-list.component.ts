import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {ManagerCustomerAccountService} from "../../../manager-customers-accounts/manager-customer-account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";

import { environment } from '../../../../../../environments/environment';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  ConfirmationToggleDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component";

@Component({
  selector: 'app-complaints-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    InputSwitchModule,
    InputTextModule,
    MatCard,
    MatCardHeader,
    MatMenu,
    MatMenuItem,
    NgForOf,
    RippleModule,
    SharedModule,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule,
    FormsModule,
    NgClass,
    MatMenuTrigger,
    NgIf,
    MatButton,
    UpperCasePipe
  ],
  templateUrl: './complaints-list.component.html',
  styleUrl: './complaints-list.component.css'
})
export class ComplaintsListComponent implements OnInit, AfterViewInit, OnDestroy
{
  loadingPage: boolean = false;
  isSave: boolean = false;

  headerTitle: string | undefined;

  scrollHeight: string = '380px';

  pageSort: string = '-updated_at';
  pageOrder: string = 'desc';
  pageNumber: number = 1;
  pageSize: number = 10;
  pageSizeList: any[] = [
    {
      name: 5,
    },
    {
      name: 10,
    },
    {
      name: 15,
    },
    {
      name: 20,
    },
    {
      name: 30,
    },
    {
      name: 50,
    },
    {
      name: 100,
    },
  ];

  first = 0;

  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;

  dataList: any[] = [];

  fakeDataList: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  fakeDataListOne: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  fakeDataListTwo: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  statusList: any[] = [
    { label: 'En Attente', value: '1' },
    { label: 'Validé', value: '2' },
    { label: 'Refusé', value: '3' },
  ];

  dataPaginationResponse: any = null;

  loading: boolean = false;
  rows = 0;
  totalRecords: number = 0;

  isLoadingFiles: boolean = false;

  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService,
    private managerCustomerAccountService: ManagerCustomerAccountService
  ) {}

  ngOnInit(): void {

    localStorage.removeItem('COMPLAINT_DATA');

    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        console.log('screens matches XSmall : pageSize 5');
        this.scrollHeight = '390px';
        this.pageSize = 5;
        this.rows = this.pageSize;
        this.fakeDataList = this.fakeDataListOne;
        this.onGetDataList();
      }
    });

    this.responsive.observe(Breakpoints.Small).subscribe((result) => {
      if (result.matches) {
        console.log('screens matches Small : pageSize 5');
        this.scrollHeight = '390px';
        this.pageSize = 5;
        this.rows = this.pageSize;
        this.fakeDataList = this.fakeDataListOne;
        this.onGetDataList();
      }
    });

    this.responsive.observe(Breakpoints.Large).subscribe((result) => {
      if (result.matches) {
        console.log('screens matches Large : pageSize 5');
        this.scrollHeight = '390px';
        this.pageSize = 5;
        this.rows = this.pageSize;
        this.fakeDataList = this.fakeDataListOne;
        this.onGetDataList();
      }
    });

    this.responsive.observe(Breakpoints.XLarge).subscribe((result) => {
      if (result.matches) {
        console.log('screens matches XLarge : pageSize 10');
        this.scrollHeight = '660px';
        this.pageSize = 10;
        this.rows = this.pageSize;
        this.fakeDataList = this.fakeDataListTwo;
        this.onGetDataList();
      }
    });

    if (localStorage.getItem('APP_HEADER_TITLE')) {
      localStorage.removeItem('APP_HEADER_TITLE');
    }

    this.headerTitle = 'Marketing';
    localStorage.setItem('APP_HEADER_TITLE', this.headerTitle);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
  }

  onGetDataList() {
    this.loadingPage = true;
    this.loading = true;

    console.log(this.currentPage);

    this.pageNumber = this.currentPage;

    let filter = {
      status: 0,
    };

    this.dataList = [];

    this.managerCustomerAccountService
      .onGetComplaintListList(
        filter,
        this.pageNumber,
        this.pageSize,
        this.pageSort
      )
      .subscribe(
        (responseData: HttpResponse<any>) => {
          this.loadingPage = false;
          this.loading = false;

          console.log(responseData);

          this.dataPaginationResponse = responseData['body'];

          if (
            this.dataPaginationResponse &&
            this.dataPaginationResponse.pagination
          ) {
            this.dataPaginationResponse.pageSize =
              this.dataPaginationResponse.pagination.limit;
            this.dataPaginationResponse.totalPages =
              this.dataPaginationResponse.pagination.total_pages;
            this.dataPaginationResponse.totalElements =
              this.dataPaginationResponse.pagination.total_records;

            this.totalRecords = this.dataPaginationResponse.totalElements;

            if (this.dataPaginationResponse.totalPages > 0) {
              this.dataList = this.dataPaginationResponse.data;

              if (this.currentPage <= 0) {
                this.currentPage++;
              }
            }
          }
        },
        (errorData: HttpErrorResponse) => {
          this.loadingPage = false;
          this.loading = false;

          console.log(errorData);
          this.onGetNotificationErrorDialog();
        }
      );
  }

  onGetNotificationErrorDialog(): void {

    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '400px',
      height: '340px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.closeDialog();
      }
    });
  }


  onGetCustomerAccountFilesById(element: any) {
    this.isLoadingFiles = true;

    let filters = {
      user_id: element.id,
    };

    this.managerCustomerAccountService
      .onGetCustomerAccountFilesById(filters)
      .subscribe(
        (responseData: HttpResponse<any>) => {
          this.isLoadingFiles = false;
          console.log(responseData);

          let responseBody = responseData['body'];

          element.files = responseBody.data;
        },
        (errorData: HttpErrorResponse) => {
          this.isLoadingFiles = false;

          console.log(errorData);
        }
      );
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onGoToPrevious() {
    if (!this.isSave) {
      this.currentPage--;
      this.onGetDataList();
    }
  }

  onGoToNext() {
    if (!this.isSave) {
      this.currentPage++;
      this.onGetDataList();
    }
  }

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  onGetPageSize(name: number) {
    this.pageSize = name;
    this.rows = this.pageSize;
    this.pageNumber = 1;
    this.currentPage = 1;
    this.onGetDataList();
  }

  // @ts-ignore
  getSeverity(status: string) {
    switch (status) {
      case '1':
        return 'warning';

      case '2':
        return 'success';

      case '3':
        return 'danger';

      case '4':
        return '';
    }
  }

  onGoToView(data: any) {
    this.loadingPage = true;
    console.info(data);

    // @ts-ignore
    localStorage.setItem('COMPLAINT_DATA', JSON.stringify(data));

    this._router
      .navigateByUrl('/account/marketing/complaints/open/view')
      .then(() => {
        this.loadingPage = false;
      });
  }

  loadCarsLazy(event: any) {
    setTimeout(() => {
      // @ts-ignore
      event.forceUpdate();
    }, Math.random() * 1000 + 250);
  }

  protected readonly environment = environment;

  onConfirmToggleEnabled(data: any): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(
      ConfirmationToggleDialogComponent,
      {
        hasBackdrop: false,
        width: '400px',
        height: '400px',
        data: {
          dialogMessage: 'fermer ce ticket ' + data.numero_tiket,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.pageNumber = 0;
        this.currentPage = 0;
        this.onSaveToggleEnable(data);
      } else {
        data.is_active = !data.is_active;
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


  closeDialog() {
    this._dialog.closeAll();
  }

  private onSaveToggleEnable(data: any) {
    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.saveComplaintToggleEnable(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
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

    this.rows = this.pageSize;
    this.pageNumber = 1;
    this.currentPage = 1;
    this.onGetDataList();

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

  onGetSegmentByCode(item: any) {

    this.accountService.getSegmentByCode(item.code_segment)
      .subscribe((responseData: HttpResponse<any>) => {

        console.log(responseData);

        let responseBody = responseData['body'];

        if (responseBody) {
          item.segment = responseBody;
        }

      }, (errorData: HttpErrorResponse) => {

        console.log(errorData);

      });

  }


}
