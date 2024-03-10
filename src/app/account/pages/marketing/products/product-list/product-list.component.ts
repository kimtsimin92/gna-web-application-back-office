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
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
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
    ImageModule
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

  fakeItems: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Marketing";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

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
    this._router.navigateByUrl("/account/products/add");
  }

  onEdit(element: any) {
  }

  onView(element: any) {
  }

  onGoToPrevious() {
  }

  onGoToNext() {
  }

  onGetDataList() {

    let page = 0;

    if (this.currentPage > 0) {
      page = this.currentPage - 1;
    } else {
      page = this.currentPage;
    }

    this.accountService.getProducts(page)
      .subscribe((responseData: HttpResponse<any>) => {
        console.log(responseData);
        this.dataPaginationResponse = responseData["body"];
        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {
          this.filteredList = this.dataPaginationResponse.products;
          if (this.currentPage <= 0) {
            this.currentPage++;
          }
        }
      }, (errorData: HttpErrorResponse) => {
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


}
