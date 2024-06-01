import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ImageModule} from "primeng/image";
import {SkeletonModule} from "primeng/skeleton";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";

import { environment } from '../../../../../../environments/environment';
import {FormsModule} from "@angular/forms";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";

@Component({
  selector: 'app-form-quotation-list',
  standalone: true,
  imports: [
    DatePipe,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatProgressSpinner,
    NgIf,
    ImageModule,
    SkeletonModule,
    ButtonModule,
    InputSwitchModule,
    MatMenu,
    MatMenuItem,
    NgForOf,
    TableModule,
    TagModule,
    TooltipModule,
    FormsModule,
    MatMenuTrigger,
    NgClass
  ],
  templateUrl: './form-quotation-list.component.html',
  styleUrl: './form-quotation-list.component.css'
})
export class FormQuotationListComponent implements OnInit, OnDestroy, AfterViewInit {

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
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("FORM_QUOTATION_DATA")) {
      localStorage.removeItem("FORM_QUOTATION_DATA");
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetDataList();

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }



  onAdd() {
    this._router.navigateByUrl("/account/management/products/quotes/forms/add");
  }

  onView(element: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("FORM_QUOTATION_DATA", JSON.stringify(element));

    this._router.navigateByUrl("/account/simulation")
      .then(() => {
        this.loadingPage = false;
      });
  }



  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    this.dataList = [];

    if (this.currentPage > 0) {
      this.pageNumber = this.currentPage - 1;
    } else {
      this.pageNumber = this.currentPage;
    }

    this.accountService.getFormQuotations(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(responseData);

        this.dataPaginationResponse = responseData["body"];

        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

            this.totalRecords = this.dataPaginationResponse.totalElements;

            if (this.dataPaginationResponse.totalPages > 0) {

              this.dataList = this.dataPaginationResponse.items;

              if (this.currentPage <= 0) {
                this.currentPage++;
              }

            }

          if (this.dataPaginationResponse.items && this.dataPaginationResponse.items.length > 0) {

            this.dataPaginationResponse.items.forEach((qf: any) => {

              if (qf.steps && qf.steps.length > 0) {

                qf.steps.forEach((s: any) => {

                  if (s.questions && s.questions.length > 0) {

                    s.questions.forEach((q: any) => {
                      if (q.field) {
                        q.field = JSON.parse(q.field);
                      }

                    });

                  }

                });

              }

            });
          }


          if (this.currentPage <= 0) {
            this.currentPage++;
          }
        }
      }, (errorData: HttpErrorResponse) => {
        this.loadingPage = false;
        this.loading = false;
        console.log(errorData);
        this.dataPaginationResponse = {};
        this.onGetNotificationErrorDialog();
      });
  }

  onGetNotificationErrorDialog(): void {

    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.closeDialog();
      }
    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onEdit(item: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("FORM_QUOTATION_DATA", JSON.stringify(item));

    this._router.navigateByUrl("/account/management/products/quotes/forms/edit")
      .then(() => {
        this.loadingPage = false;
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
      height: '400px',
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
          dialogMessage: 'le formulaire ' + data.name,
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

    this.accountService.saveQuoteFormToggleEnable(data.id).subscribe(
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
    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
