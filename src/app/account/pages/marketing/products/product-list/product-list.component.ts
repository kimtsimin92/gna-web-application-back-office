import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AccountService} from "../../../../account.service";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SkeletonModule} from "primeng/skeleton";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {ImageModule} from "primeng/image";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    DatePipe,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatProgressSpinner,
    NgIf,
    SkeletonModule,
    NgOptimizedImage,
    ImageModule,
    OverlayPanelModule,
    ButtonModule,
    InputSwitchModule,
    MatMenu,
    MatMenuItem,
    NgForOf,
    TableModule,
    TagModule,
    TooltipModule,
    MatMenuTrigger,
    NgClass,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {

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

  pageSort: string = "name";
  pageOrder: string = "asc";



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

    this.headerTitle = "Marketing";
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

    this.onGetDataList();

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

  onEdit(item: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("PRODUCT_DATA", JSON.stringify(item));

    this._router.navigateByUrl("account/marketing/products/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onView(item: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("PRODUCT_DATA", JSON.stringify(item));

    this._router.navigateByUrl("account/marketing/products/view")
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


    this.accountService.getProducts(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;
        console.log(responseData);

        console.log(responseData);
        this.dataPaginationResponse =  responseData["body"];

        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

          this.dataList = this.dataPaginationResponse.products;
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

}
