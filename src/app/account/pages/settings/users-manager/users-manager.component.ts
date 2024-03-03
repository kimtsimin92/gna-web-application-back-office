import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../account.service";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDivider} from "@angular/material/divider";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {Table, TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {Tooltip, TooltipModule} from "primeng/tooltip";
import {CheckboxModule} from "primeng/checkbox";
import {PaginatorModule} from "primeng/paginator";
import {
  ErrorNotificationDialogComponent
} from "../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {ChipModule} from "primeng/chip";
import {ProgressBarModule} from "primeng/progressbar";
import {MatProgressBar} from "@angular/material/progress-bar";
import {SkeletonModule} from "primeng/skeleton";
import {MatTooltip} from "@angular/material/tooltip";

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
  selector: 'app-users-manager',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatSlideToggle,
        MatSuffix,
        MatTab,
        MatTabGroup,
        NgIf,
        ReactiveFormsModule,
        MatPaginator,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatSortHeader,
        DatePipe,
        UpperCasePipe,
        DecimalPipe,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatProgressSpinner,
        MatMiniFabButton,
        FormsModule,
        MatPrefix,
        MatDivider,
        BreadcrumbModule,
        TagModule,
        ButtonModule,
        InputSwitchModule,
        TableModule,
        CurrencyPipe,
        InputTextModule,
        RippleModule,
        TooltipModule,
        CheckboxModule,
        PaginatorModule,
        ChipModule,
        ProgressBarModule,
        MatProgressBar,
        SkeletonModule,
        NgStyle,
        NgForOf,
        MatTooltip,
    ],
  templateUrl: './users-manager.component.html',
  styleUrl: './users-manager.component.css'
})
export class UsersManagerComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  isDisabled: boolean = true;
  isReadonly: boolean = false;

  loading: boolean = true;
  isDownload: boolean = false;


  userListData: any[] = [];

  cols!: Column[];


  displayedColumns: string[] = ['firstName', 'lastName', 'type', 'profile', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(this.userListData);
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

  loadingPage: boolean = false;
  isActivated: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  first: number = 0;

  rows: number = 10;

  totalRecords: number = 0;

  fakeDataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  dataPaginationResponse: any;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Utilisateurs";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.items = [{ label: 'Paramètres' }, { label: 'Utilisateurs' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.cols = [
      { field: 'firstName', header: 'Nom' },
      { field: 'lastName', header: 'Prénom' },
      { field: 'gender', header: 'Genre' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Téléphone' },
      { field: 'createdAt', header: 'Enregistrement' },
      { field: 'enabled', header: 'Statut' },
      { field: 'action', header: '' }
    ];

  }
  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.onGetUserListData();
  }

  clear(table: Table) {
    table.clear();
  }

  exportPdf() {

  }

  exportExcel() {

  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }



  onGetUserListData() {

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // @ts-ignore
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.isLoadingResults = true;
          return this.accountService.getUsersListData(
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
          this.dataSource = new MatTableDataSource<any>(this.dataPaginationResponse.users);
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


  openNotificationErrorDialog(): void {

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

  closeDialog() {
    this._dialog.closeAll();
  }

  onViewAdd() {
    this._router.navigateByUrl("/account/settings/users/add");
  }

  onView(userAccountData: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(userAccountData));

      this._router.navigateByUrl("/account/settings/users/view")
        .then(() => {
          this.loadingPage = false;
        });

  }

  onViewEdit(userAccountData: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(userAccountData));

      this._router.navigateByUrl("/account/settings/users/edit")
        .then(() => {
          this.loadingPage = false;
        });

  }

  onReload() {
    location.reload();
  }
}
