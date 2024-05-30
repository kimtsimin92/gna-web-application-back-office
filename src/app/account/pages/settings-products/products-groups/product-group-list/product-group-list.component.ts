import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
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
import {ChipModule} from "primeng/chip";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTooltip} from "@angular/material/tooltip";
import {TooltipModule} from "primeng/tooltip";
import {SkeletonModule} from "primeng/skeleton";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {FormsModule} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    ChipModule,
    DecimalPipe,
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
    DatePipe,
    MatCardHeader,
    NgIf,
    SkeletonModule,
    InputSwitchModule,
    MatMenu,
    MatMenuItem,
    NgForOf,
    TableModule,
    TagModule,
    FormsModule,
    MatMenuTrigger,
    NgClass
  ],
  templateUrl: './product-group-list.component.html',
  styleUrl: './product-group-list.component.css'
})
export class ProductGroupListComponent implements OnInit, OnDestroy, AfterViewInit {

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

  pageSort: string = "name";
  pageOrder: string = "asc";

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

  constructor(
    private responsive: BreakpointObserver,
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public accountService: AccountService) {

  }
  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
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
    this._router.navigateByUrl("/account/management/products/groups/add");
  }

  onGetNotificationErrorDialog(): void {

    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {
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
    localStorage.setItem("PRODUCT_GROUP_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/management/products/groups/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onEdit(data: any) {

    this.loadingPage = true;
    console.info(data);

    // @ts-ignore
    localStorage.setItem("PRODUCT_GROUP_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/management/products/groups/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
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

      this.accountService.getProductGroups(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
        .subscribe((responseData: HttpResponse<any>) => {

          console.log(responseData);
          this.loadingPage = false;
          this.loading = false;

          console.log(responseData);
          this.dataPaginationResponse =  responseData["body"];

          if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

            this.dataList = this.dataPaginationResponse.productGroups;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onConfirm(data: any): void {

   /* this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      height: '250px',
      data: {
        dialogMessage: "du groupe produit " + data.name
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
*/
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
        dialogMessage: "La suppression du groupe produit a réussi."
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
        dialogMessage: "La suppression du groupe produit a échoué."
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
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredList = this.dataPaginationResponse.productGroups;
      return;
    }

    console.log(text);

    if (this.dataPaginationResponse && this.dataPaginationResponse.productGroups) {
      this.filteredList = this.dataPaginationResponse.productGroups.filter(
        // @ts-ignore
        guarantee => guarantee?.name.toLowerCase().includes(text.toLowerCase())
      );
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
