import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterRow,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AccountService} from "../../../../account.service";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {
  ConfirmationRemoveDialogComponent
} from "../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTooltip} from "@angular/material/tooltip";
import {TooltipModule} from "primeng/tooltip";
import {ChipModule} from "primeng/chip";
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {SkeletonModule} from "primeng/skeleton";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {TagModule} from "primeng/tag";
import {InputSwitchModule} from "primeng/inputswitch";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Breakpoints} from '@angular/cdk/layout';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthService} from "../../../../../auth/auth.service";

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-guarantee-list',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    InputTextModule,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatTooltip,
    TooltipModule,
    MatHeaderCellDef,
    ChipModule,
    DecimalPipe,
    DatePipe,
    MatCardHeader,
    NgIf,
    SkeletonModule,
    MatFooterRow,
    MatInput,
    MatFormField,
    MatLabel,
    TableModule,
    DropdownModule,
    PaginatorModule,
    TagModule,
    NgForOf,
    NgStyle,
    InputSwitchModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgClass,
    CurrencyPipe,
  ],
  templateUrl: './guarantee-list.component.html',
  styleUrl: './guarantee-list.component.css'
})
export class GuaranteeListComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  loading: boolean = false;
  dataPaginationResponse: any = null;

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);


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

  totalPages: number = 0;
  currentPage: number = 0;


  fakeDataList: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},  {id: 6}];
  fakeDataListOne: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  fakeDataListTwo: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @Output() newEvent = new EventEmitter<boolean>();
  isSave: boolean = false;
  isDisable: boolean = true;

  scrollHeight: string = "380px";

  filteredList: any[] = [];

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

  onPageChange1(event: PageEvent) {
    this.first1 = event.first;
    this.rows1 = event.rows;
  }

  onPageChange2(event: any) {
    this.first2 = event.first;
    this.rows2 = event.rows;
  }

  onPageChange3(event: PageEvent) {
    this.first3 = event.first;
    this.rows3 = event.rows;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  stateOn: boolean = true;
  stateOff: boolean = false;

  statusList: any[] = [
    { label: 'En Attente', value: '1' },
    { label: 'Validé', value: '2' },
    { label: 'Refusé', value: '3' },
    ];

  constructor(
    private responsive: BreakpointObserver,
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public authService: AuthService,
    public accountService: AccountService) {

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
          this.fakeDataList = this.fakeDataListOne;
          this.onGetDataList();
        }

      });

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);


  }

  ngAfterViewInit(): void {
    this.onGetDataList();
  }

  ngOnDestroy(): void {
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


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onGoToSave() {
    this._router.navigateByUrl("/account/management/products/guarantees/add");
  }


  onView(data: any) {

    this.loadingPage = true;
    console.info(data);

    // @ts-ignore
    localStorage.setItem("GUARANTEE_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/management/products/guarantees/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onViewEdit(data: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("GUARANTEE_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/management/products/guarantees/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }


/*  onGetDataList() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.accountService.getGuarantees(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {

          console.log(data);

          if (data) {

            if (data["body"]) {
              // Flip flag to show that loading has finished.
              // @ts-ignore
              this.dataPaginationResponse =  data["body"];

              // @ts-ignore
              this.isRateLimitReached = this.dataPaginationResponse === null;

              if (this.dataPaginationResponse === null) {
                return [];
              }

              // Only refresh the result length if there is new data. In case of rate
              // limit errors, we do not want to reset the paginator to zero, as that
              // would prevent users from re-triggering requests.
              this.resultsLength = this.dataPaginationResponse.totalElements;
              this.dataSource = new MatTableDataSource<any>(this.dataPaginationResponse.guarantees);
              this.isLoadingResults = false;
            } else {
              this.isLoadingResults = false;
            }
          } else {
            this.isLoadingResults = false;
            this.onGetNotificationErrorDialog();
          }
          console.log(this.dataPaginationResponse);
          return this.dataSource;
        })
      )// @ts-ignore
      .subscribe(data => (this.dataPaginationResponse = data));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/
  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    this.dataList = [];

    if (this.currentPage > 0) {
      this.pageNumber = this.currentPage - 1;
    } else {
      this.pageNumber = this.currentPage;
    }

    this.accountService.onGetGuaranteeList(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(responseData);
        this.dataPaginationResponse =  responseData["body"];

        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

          this.dataList = this.dataPaginationResponse.guarantees;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onConfirm(data: any): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de la garantie " + data.name
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
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
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }


  private onSave(data: any) {

   this.isSave = true;

   this.onSaveLoadingDialog();

   this.accountService.removeGuarantee(data.id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onGetDataList();
        this.onSaveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La suppression de la garantie a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });


  }


  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La suppression de la garantie a échoué."
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

  onReload() {
    location.reload();
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
    this.pageNumber = 0;
    this.currentPage = 0;
    this.onGetDataList();
  }

}
