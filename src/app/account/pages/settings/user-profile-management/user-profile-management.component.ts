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
import {MatCard} from "@angular/material/card";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {LiveAnnouncer} from "@angular/cdk/a11y";

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
    MatCheckbox
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

  }
  ngAfterViewInit(): void {
    this.onGetDataList();

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

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.accountService.getProfiles(
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
          this.isLoadingResults = false;
          // @ts-ignore
          this.isRateLimitReached = this.dataPaginationResponse === null;

          if (this.dataPaginationResponse === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = this.dataPaginationResponse.totalElements;
          // @ts-ignore
          this.dataSource = new MatTableDataSource<any>(this.dataPaginationResponse.profiles);
            } else {
              this.isLoadingResults = false;
            }
          } else {
            this.isLoadingResults = false;
          }
          return this.dataSource;
        }),
      )// @ts-ignore
      .subscribe(data => (this.dataPaginationResponse = data));

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

  onViewAdd() {
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

  onViewEdit(element: any) {
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
}
