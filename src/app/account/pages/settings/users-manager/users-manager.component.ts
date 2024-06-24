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
import {CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, UpperCasePipe} from "@angular/common";
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
import {
  ConfirmationToggleEnableDialogComponent
} from "../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  RemoveLoadingDialogComponent
} from "../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {
  SaveErrorNotificationDialogComponent
} from "../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

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
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgClass,
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

  dataList: any[] = [];
  dataPaginationResponse: any;

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


  loadingPage: boolean = false;
  isActivated: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  rows: number = 10;

  totalPages: number = 0;
  currentPage: number = 0;

  filteredList: any[] = [];

  isSave: boolean = false;

  isLoading: boolean = false;

  isDisable: boolean = true;

  fakeItems: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];

  scrollHeight: string = "380px";

  pageSort: string = "createdAt";
  pageOrder: string = "desc";
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
  totalRecords: number = 0;

  fakeDataList: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},  {id: 6}];
  fakeDataListOne: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  fakeDataListTwo: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];


  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    localStorage.removeItem("USER_ACCOUNT_DATA");


    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion Utilisateurs Internes";
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

    this.onGetDataList();

  }
  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }

  clear(table: Table) {
    table.clear();
  }

  exportPdf() {

  }


  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    this.pageNumber = this.currentPage;

    this.dataList = [];

    this.accountService.getUsersListData(this.pageSort, this.pageOrder, this.pageNumber, this.pageSize)
      .subscribe((responseData: HttpResponse<any>) => {

          this.loadingPage = false;
          this.loading = false;

          console.log(responseData);

          this.dataPaginationResponse = responseData['body'];

          if (this.dataPaginationResponse) {

            this.totalRecords = this.dataPaginationResponse.totalElements;

            if (this.dataPaginationResponse.totalPages > 0) {

              this.dataList = this.dataPaginationResponse.data;

              if (this.currentPage <= 0) {
                this.currentPage++;
              }

            }

          }

        },
        (errorData: HttpErrorResponse) => {
          this.loadingPage = false;
          this.loading = false;
          console.log(errorData);
          this.onGetNotificationErrorDialog();
        }
      );

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

  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
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
    this._router.navigateByUrl("/account/admin/users/interns/add");
  }

  onView(userAccountData: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(userAccountData));

      this._router.navigateByUrl("/account/admin/users/interns/view")
        .then(() => {
          this.loadingPage = false;
        });

  }

  onViewEdit(userAccountData: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("USER_ACCOUNT_DATA", JSON.stringify(userAccountData));

      this._router.navigateByUrl("/account/admin/users/interns/edit")
        .then(() => {
          this.loadingPage = false;
        });

  }

  onReload() {
    location.reload();
  }

  filterResults(value: string) {

    if (!value) {
      this.filteredList = this.dataPaginationResponse.data;
      return;
    }

    if (this.dataPaginationResponse && this.dataPaginationResponse.data) {
      this.filteredList = this.dataPaginationResponse.data.filter(
        (data: any) => data?.firstName.toLowerCase().includes(value.toLowerCase())
      );
    }

  }

  onConfirmToggleEnabled(data: any, isToggle: boolean): void {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationToggleEnableDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "cet utilisateur " + data.firstName + " " + data.lastName,
        isToggle: isToggle
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.pageNumber = 0;
        this.currentPage = 0;
        this.onSaveToggleEnable(data);
      } else {
        data.enabled = !data.enabled;
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  private onSaveToggleEnable(data: any) {

    this.isSave = true;

    this.openSaveLoadingDialog();

    this.accountService.managerUsersToggleEnable(data.id)
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

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  onGetPageSize(name: number) {
    this.pageSize = name;
    this.rows = this.pageSize;
    this.pageNumber = 0;
    this.currentPage = 0;
    this.onGetDataList();
  }


  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
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
