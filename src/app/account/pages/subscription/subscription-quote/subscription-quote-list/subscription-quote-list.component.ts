import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
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
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {RippleModule} from "primeng/ripple";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-subscription-quote-list',
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
    NgClass,
    MatMenuTrigger,
    CurrencyPipe,
    RippleModule
  ],
  templateUrl: './subscription-quote-list.component.html',
  styleUrl: './subscription-quote-list.component.css'
})
export class SubscriptionQuoteListComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  totalPages: number = 0;
  currentPage: number = 0;

  dataPaginationResponse: any;
  filteredList: any[] = [];


  isLoading: boolean = false;

  isReadonly: boolean = true;
  isDisable: boolean = true;

  fakeItems: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];
  loadingPage: boolean = false;


  pageNumber: number = 0;
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

  pageSort: string = "updatedAt";
  pageOrder: string = "desc";



  fakeDataList: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},  {id: 6}];
  fakeDataListOne: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  fakeDataListTwo: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @Output() newEvent = new EventEmitter<boolean>();
  isSave: boolean = false;

  scrollHeight: string = "380px";


  dataList: any[] = [];

  first = 0;
  rows = 10;

  first1: number = 0;

  rows1: number = 10;

  first2: number = 0;

  rows2: number = 10;

  first3: number = 0;

  rows3: number = 10;

  totalRecords: number = 0;

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 100, value: 100 }
  ];

  loading: boolean = false;

  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    if (localStorage.getItem("PRODUCT_DATA")) {
      localStorage.removeItem("PRODUCT_DATA");
    }

    this.headerTitle = "Gestion des souscriptions";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

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
          this.fakeDataList = this.fakeDataListOne;
          this.onGetDataList();
        }

      });

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  filterResults(value: string) {

    if (!value) {
      this.filteredList = this.dataPaginationResponse.products;
      return;
    }

    if (this.dataPaginationResponse && this.dataPaginationResponse.products) {
      this.filteredList = this.dataPaginationResponse.products.filter(
        (data: any) => data?.name.toLowerCase().includes(value.toLowerCase())
      );
    }

  }

  onAdd() {
    this._router.navigateByUrl("account/marketing/products/add");
  }


  onView(item: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("QUOTE_DATA", JSON.stringify(item));

    this._router.navigateByUrl("account/subscriptions/quotes/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
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


    this.accountService.getQuoteList(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;
        console.log(responseData);

        console.log(responseData);
        this.dataPaginationResponse =  responseData["body"];

        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

          this.dataList = this.dataPaginationResponse.items;
          this.totalRecords = this.dataList.length;

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
      height: '340px',
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

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  onGetPageSize(name: number) {
    this.pageSize = name;
    this.pageNumber = 0;
    this.currentPage = 0;
    this.onGetDataList();
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onGoToSimulation(element: any) {
    /*// @ts-ignore
    localStorage.setItem("PRODUCT_DATA", JSON.stringify(element));
    this._router.navigateByUrl("account/simulation")
      .then(() => {
        this.loadingPage = false;
      });*/
  }

  protected readonly environment = environment;
}
