import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {SharedModule} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AccountService} from "../../../../account.service";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ConfirmationRemoveDialogComponent
} from "../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";

import { environment } from '../../../../../../environments/environment';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-category-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    InputSwitchModule,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatMenu,
    MatMenuItem,
    NgForOf,
    SharedModule,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule,
    FormsModule,
    MatMenuTrigger,
    NgClass
  ],
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.css'
})
export class ProductCategoryListComponent implements OnInit, OnDestroy, AfterViewInit {

  loadingPage: boolean = false;
  isSave: boolean = false;

  headerTitle: string | undefined;

  scrollHeight: string = "380px";

  pageSort: string = "updatedAt";
  pageOrder: string = "desc";
  pageNumber: number = 1;
  pageSize: number = 10;
  pageSizeList: any[] = [
    {
      name: 5
    },
    {
      name: 10
    },
    {
      name: 15
    },
    {
      name: 20
    },
    {
      name: 30
    },
    {
      name: 50
    },
    {
      name: 100
    }
  ];

  first = 0;

  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;

  dataList: any[] = [];

  fakeDataList: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},  {id: 6}];
  fakeDataListOne: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  fakeDataListTwo: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];

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
  protected readonly environment = environment;
  isDisable: boolean = true;

  constructor(
    private responsive: BreakpointObserver,
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {

    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches XSmall : pageSize 5");
          this.scrollHeight = "390px";
          this.pageSize = 5;
          this.rows = this.pageSize;
          this.fakeDataList = this.fakeDataListOne;
          this.pageNumber = 0;
          this.currentPage = 0;
          this.onGetDataList();
        }

      });

    this.responsive.observe(Breakpoints.Small)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches Small : pageSize 5");
          this.scrollHeight = "390px";
          this.pageSize = 5;
          this.rows = this.pageSize;
          this.fakeDataList = this.fakeDataListOne;
          this.pageNumber = 0;
          this.currentPage = 0;
          this.onGetDataList();
        }

      });

    this.responsive.observe(Breakpoints.Large)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches Large : pageSize 5");
          this.scrollHeight = "390px";
          this.pageSize = 5;
          this.rows = this.pageSize;
          this.fakeDataList = this.fakeDataListOne;
          this.pageNumber = 0;
          this.currentPage = 0;
          this.onGetDataList();
        }

      });

    this.responsive.observe(Breakpoints.XLarge)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches XLarge : pageSize 10");
          this.scrollHeight = "660px";
          this.pageSize = 10;
          this.rows = this.pageSize;
          this.fakeDataList = this.fakeDataListTwo;
          this.pageNumber = 0;
          this.currentPage = 0;
          this.onGetDataList();
        }

      });


    if (localStorage.getItem('APP_HEADER_TITLE')) {
      localStorage.removeItem('APP_HEADER_TITLE');
    }

    this.headerTitle = 'Paramètres';
    localStorage.setItem('APP_HEADER_TITLE', this.headerTitle);


    this.onGetDataList();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  onGoToSave() {
    this._router.navigateByUrl('/account/settings/lists/categories/add');
  }

  onGetNotificationErrorDialog(): void {
    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.closeDialog();
      }
    });
  }

  onView(data: any) {
    this.loadingPage = true;
    console.info(data);

    // @ts-ignore
    localStorage.setItem('CATEGORY_DATA', JSON.stringify(data));

    this._router.navigateByUrl('/account/settings/lists/categories/view').then(() => {
      this.loadingPage = false;
    });
  }

  onViewEdit(data: any) {
    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem('CATEGORY_DATA', JSON.stringify(data));

    this._router.navigateByUrl('/account/settings/lists/categories/edit').then(() => {
      this.loadingPage = false;
    });
  }

  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    this.pageNumber = this.currentPage;

    this.dataList = [];

    this.accountService.getCategoryListData(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize).subscribe(
      (responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(responseData);

        this.dataPaginationResponse = responseData['body'];

        if (this.dataPaginationResponse) {

          this.totalRecords = this.dataPaginationResponse.totalElements;

          if (this.dataPaginationResponse.totalPages > 0) {

            this.dataList = this.dataPaginationResponse.items;

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

  onConfirm(data: any): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '400px',
      data: {
        dialogMessage: 'du categorie ' + data.name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.pageNumber = 0;
        this.currentPage = 0;
        this.onSave(data);
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  onSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(RemoveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private onSave(data: any) {
    this.isSave = true;

    this.onSaveLoadingDialog();

    this.accountService.saveCategoryRemove(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.dataList = [];
        this.onGetDataList();
        this.onSaveNotificationDialog();
      },
      (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      }
    );
  }

  onSaveNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400px',
      data: {
        dialogMessage: 'La suppression du categorie a réussi.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {
    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      data: {
        httpError: error,
        dialogMessage: 'La suppression du categorie a échoué.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onReload() {
    location.reload();
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
  }

  openSaveToggleEnableErrorNotificationDialog(error: HttpErrorResponse): void {
    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '400',
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

  onConfirmToggleEnabled(data: any, isToggle: boolean): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(
      ConfirmationToggleEnableDialogComponent,
      {
        hasBackdrop: false,
        width: '400px',
        height: '400px',
        data: {
          dialogMessage: 'le categorie ' + data.name,
          isToggle: isToggle,
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
        data.enabled = !data.enabled;
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  private onSaveToggleEnable(data: any) {
    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.saveCategoryToggleEnable(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onGetDataList();
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


  openSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(RemoveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
    this.pageNumber = 0;
    this.currentPage = 0;
    this.onGetDataList();
  }
  }
