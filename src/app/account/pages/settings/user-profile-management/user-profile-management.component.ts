import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../account.service";
import {MenuItem} from "primeng/api";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {ChipModule} from "primeng/chip";
import {DatePipe, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {PaginatorModule} from "primeng/paginator";
import {ProgressBarModule} from "primeng/progressbar";
import {TableModule} from "primeng/table";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ImageModule} from "primeng/image";
import {SkeletonModule} from "primeng/skeleton";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";
import {
  RemoveLoadingDialogComponent
} from "../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";

@Component({
  selector: 'app-user-profile-management',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    ChipModule,
    DatePipe,
    InputTextModule,
    MatButton,
    NgIf,
    PaginatorModule,
    ProgressBarModule,
    TableModule,
    MatCell,
    MatCellDef,
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
    MatHeaderCellDef,
    MatCard,
    MatTooltip,
    MatCheckbox,
    MatCardHeader,
    ImageModule,
    SkeletonModule
  ],
  templateUrl: './user-profile-management.component.html',
  styleUrl: './user-profile-management.component.css'
})
export class UserProfileManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  loading: boolean = false;
  dataList: any[] = [];
  dataPaginationResponse: any;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  displayedColumns: string[] = ['name', 'type', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(this.dataList);
  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @Output() newEvent = new EventEmitter<boolean>();

  pageSize: number = 10;

  totalPages: number = 0;
  currentPage: number = 0;

  filteredList: any[] = [];

  isSave: boolean = false;

  isLoading: boolean = false;

  isReadonly: boolean = true;
  isDisable: boolean = true;

  fakeItems: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Profils";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.items = [{ label: 'Paramètres' }, { label: 'Profils' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    if (localStorage.getItem("PROFILE_DATA")) {
      localStorage.removeItem("PROFILE_DATA")
    }

    this.onGetDataList();

  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("PROFILE_DATA")) {
      localStorage.removeItem("PROFILE_DATA")
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

  onGetDataList() {

    let page = 0;

    if (this.currentPage > 0) {
      page = this.currentPage - 1;
    } else {
      page = this.currentPage;
    }

    this.accountService.getProfiles(page)
      .subscribe((responseData: HttpResponse<any>) => {
        console.log(responseData);
        this.dataPaginationResponse = responseData["body"];
        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {
          this.filteredList = this.dataPaginationResponse.profiles;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd() {
    this._router.navigateByUrl("/account/settings/profiles/add");
  }

  onView(element: any) {
    this.loadingPage = true;
    this._router.navigateByUrl("/account/settings/profiles/view")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("PROFILE_DATA", JSON.stringify(element));

        this.loadingPage = false;
      });
  }

  onEdit(element: any) {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/settings/profiles/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("PROFILE_DATA", JSON.stringify(element));
        this.loadingPage = false;
      });

  }

  onReload() {
    location.reload();
  }

  filterResults(value: string) {

    if (!value) {
      this.filteredList = this.dataPaginationResponse.profiles;
      return;
    }

    if (this.dataPaginationResponse && this.dataPaginationResponse.profiles) {
      this.filteredList = this.dataPaginationResponse.profiles.filter(
        (data: any) => data?.name.toLowerCase().includes(value.toLowerCase())
      );
    }

  }

  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
  }

  closeDialog() {
    this._dialog.closeAll();
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

  onConfirmToggleEnabled(data: any, isToggle: boolean): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationToggleEnableDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "le profil " + data.name,
        isToggle: isToggle
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSaveToggleEnable(data);
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  private onSaveToggleEnable(data: any) {

    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.managerProfileToggleEnable(data.id)
      .subscribe((responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onGetDataList();
        this.openSaveToggleEnableNotificationDialog();
      }, (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveToggleEnableErrorNotificationDialog(error);
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

  openSaveToggleEnableNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "L'opération a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }


  openSaveToggleEnableErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: "L'opération a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }


}
