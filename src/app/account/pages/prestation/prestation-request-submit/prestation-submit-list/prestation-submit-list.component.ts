import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ManagerCustomerAccountService} from "../../../manager-customers-accounts/manager-customer-account.service";
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgClass, NgForOf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-prestation-submit-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DecimalPipe,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatMenu,
    MatMenuItem,
    MatProgressSpinner,
    NgForOf,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule,
    FormsModule,
    MatMenuTrigger,
    NgClass,
    RippleModule
  ],
  templateUrl: './prestation-submit-list.component.html',
  styleUrl: './prestation-submit-list.component.css'
})
export class PrestationSubmitListComponent   {

  loadingPage: boolean = false;
  isSave: boolean = false;

  isLoadingFiles: boolean = false;

  headerTitle: string | undefined;

  scrollHeight: string = "380px";

  pageSort: string = "nom";
  pageOrder: string = "asc";
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
  currentPage: number = 1;

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

  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    private managerCustomerAccountService: ManagerCustomerAccountService,) {
  }

  ngOnInit(): void {

    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches XSmall : pageSize 5");
          this.scrollHeight = "390px";
          this.pageSize = 5;
          this.rows = this.pageSize;
          this.fakeDataList = this.fakeDataListOne;
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
          this.onGetDataList();
        }

      });

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Prestations";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    console.log(this.currentPage);

    this.pageNumber = this.currentPage;

    let filter = {
      type_customer_id: "0",
    };

    this.dataList = [];

    this.managerCustomerAccountService.onGetCustomerAccountRequestListByType(filter, this.pageNumber, this.pageSize, this.pageSort)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(responseData);

        this.dataPaginationResponse = responseData['body'];

        if (this.dataPaginationResponse && this.dataPaginationResponse.pagination) {

          this.dataPaginationResponse.pageSize = this.dataPaginationResponse.pagination.limit;
          this.dataPaginationResponse.totalPages = this.dataPaginationResponse.pagination.total_pages;
          this.dataPaginationResponse.totalElements = this.dataPaginationResponse.pagination.total_records;

          this.totalRecords = this.dataPaginationResponse.totalElements;

          if (this.dataPaginationResponse.totalPages > 0) {

            this.dataList = this.dataPaginationResponse.data;

            if (this.currentPage <= 0) {
              this.currentPage++;
            }

          }

        }

      }, (errorData: HttpErrorResponse) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(errorData);

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
    localStorage.setItem("CUSTOMER_ACCOUNT_REQUEST_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/prestation/requests/submits/view")
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

  onGetCustomerAccountFilesById(element: any) {

    this.isLoadingFiles = true;

    let filters = {
      user_id: element.id
    };

    this.managerCustomerAccountService.onGetCustomerAccountFilesById(filters)
      .subscribe((responseData: HttpResponse<any>) => {

        this.isLoadingFiles = false;
        console.log(responseData);

        let responseBody = responseData['body'];

        element.files = responseBody.data;

      }, (errorData: HttpErrorResponse) => {
        this.isLoadingFiles = false;

        console.log(errorData);

      });

  }
}

