import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {MenuItem} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ProgressBarModule} from "primeng/progressbar";
import {TableModule} from "primeng/table";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {InputSwitchModule} from "primeng/inputswitch";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  ConfirmationRemoveDialogComponent
} from "../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    ChipModule,
    InputTextModule,
    MatButton,
    NgIf,
    PaginatorModule,
    ProgressBarModule,
    TableModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    InputSwitchModule,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSortHeader,
    MatProgressSpinner,
    MatPaginator,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatCard,
    MatDivider,
    MatTooltip,
    MatCheckbox
  ],
  templateUrl: './partner-list.component.html',
  styleUrl: './partner-list.component.css'
})
export class PartnerListComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  loading: boolean = false;
  partnerListData: any[] = [];
  partnerPaginationResponse: any;

  cols!: Column[];
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  displayedColumns: string[] = ['select', 'code', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  pageSize: number = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @Output() newEvent = new EventEmitter<boolean>();
  private isSave: boolean = false;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Partenaires";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.items = [{ label: 'Gestion Listes' }, { label: 'Partenaires' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    setTimeout(() => {
      this.onGetDataList();
    }, 10);


  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // this.dataSource = new MatTableDataSource<any>([]);
    // this.selection = new SelectionModel<any>(true, []);
    // this.resultsLength = 0;
    // this.pageSize = 0;
    // this.isLoadingResults = false;
    // this.isRateLimitReached = false;
  }

 /* onGetPartnerListData() {
    this.partnerListData = [];
    this.loading = true;
    this.accountService.getPartnerListData().subscribe(responseData => {
      console.log(responseData);
      // @ts-ignore
      this.partnerListData = responseData['body'];
      this.totalRecords = this.partnerListData.length;
      this.loading = false;
    }, (error => {
      console.log(error);
      this.loading = false;
      this.openNotificationErrorDialog();
    }));

  }*/

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
    this._router.navigateByUrl("/account/partners/add");
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

    console.info("PARTNER DATA");
    console.info(data);

    // @ts-ignore
    localStorage.setItem("PARTNER_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/partners/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  onViewEdit(data: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("PARTNER_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/partners/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }


  onGetDataList() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.accountService.getPartnerListData(
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
            this.partnerPaginationResponse =  data["body"];

            // @ts-ignore
            this.isRateLimitReached = this.partnerPaginationResponse === null;

            if (this.partnerPaginationResponse === null) {
              return [];
            }

            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            this.resultsLength = this.partnerPaginationResponse.totalElements;
              this.dataSource = new MatTableDataSource<any>(this.partnerPaginationResponse.partners);
            this.isLoadingResults = false;
          } else {
            this.isLoadingResults = false;
          }
          } else {
            this.isLoadingResults = false;
            this.onGetNotificationErrorDialog();
          }
          console.log(this.partnerPaginationResponse);
          return this.dataSource;
        })
      )// @ts-ignore
      .subscribe(data => (this.partnerPaginationResponse = data));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      width: '440px',
      height: '250px',
      data: {
        dialogMessage: "du partenaire " + data.name
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

  openSaveLoadingDialog(): void {

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

    this.openSaveLoadingDialog();

    this.accountService.savePartnerRemove(data.id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onGetDataList();
        this.openSaveNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveErrorNotificationDialog(error);
      });

  }

  openSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: "La suppression du partenaire a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }



  openSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "La suppression du partenaire a échoué."
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

}
