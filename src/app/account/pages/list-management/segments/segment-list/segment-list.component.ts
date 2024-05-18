import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AccountService } from '../../../../account.service';
import { ErrorNotificationDialogComponent } from '../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ConfirmationRemoveDialogComponent } from '../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component';
import { RemoveLoadingDialogComponent } from '../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';
import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ConfirmationToggleEnableDialogComponent } from '../../../../dialogs/confirmation/confirmation-toggle-enable-dialog/confirmation-toggle-enable-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-segment-list',
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
    DatePipe,
    MatCardHeader,
    NgIf,

    DecimalPipe,
    DropdownModule,
    InputSwitchModule,
    MatMenu,
    MatMenuItem,
    NgForOf,
    SkeletonModule,
    TableModule,
    TagModule,
    FormsModule,
    MatMenuTrigger,
    NgClass,
    RippleModule,
    NgStyle,

  ],
  templateUrl: './segment-list.component.html',
  styleUrl: './segment-list.component.css',
})
export class SegmentListComponent implements OnInit, OnDestroy, AfterViewInit {
 
  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  loadingPage: boolean = false;
  loading: boolean = false;
  dataPaginationResponse: any;

  pageSort: string = '-created_at';
  pageOrder: string = 'desc';
  pageNumber: number = 1;
  pageSize: number = 10;
  pageSizeList: any[] = [
    {
      name: 5,
    },
    {
      name: 10,
    },
    {
      name: 15,
    },
    {
      name: 20,
    },
    {
      name: 30,
    },
    {
      name: 50,
    },
    {
      name: 100,
    },
  ];

  first: number = 0;

  
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;

  rows = 0;
  totalRecords: number = 0;
  isLoadingFiles: boolean = false;



  displayedColumns: string[] = ['select', 'code', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  @Output() newEvent = new EventEmitter<boolean>();
  isSave: boolean = false;
  filteredList: any[] = [];


  
  fakeDataList: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  
  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('APP_HEADER_TITLE')) {
      localStorage.removeItem('APP_HEADER_TITLE');
    }

    this.headerTitle = 'Marketing';
    localStorage.setItem('APP_HEADER_TITLE', this.headerTitle);

    this.items = [{ label: 'Gestion Listes' }, { label: 'Segments' }];

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.onGetDataList();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  onGoToSave() {
    this._router.navigateByUrl('/account/segments/add');
  }

  onGetNotificationErrorDialog(): void {
    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe((result) => {
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
    localStorage.setItem('SEGMENT_DATA', JSON.stringify(data));

    this._router.navigateByUrl('/account/segments/view').then(() => {
      this.loadingPage = false;
    });
  }

  onViewEdit(data: any) {
    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem('SEGMENT_DATA', JSON.stringify(data));

    this._router.navigateByUrl('/account/segments/edit').then(() => {
      this.loadingPage = false;
    });
  }

  onGetDataList() {
    let page = 0;

    if (this.currentPage > 0) {
      page = this.currentPage - 1;
    } else {
      page = this.currentPage;
    }

    this.accountService.getSegmentListData(page).subscribe(
      (responseData: HttpResponse<any>) => {
        console.log(responseData);
        this.dataPaginationResponse = responseData['body'];
        if (
          this.dataPaginationResponse &&
          this.dataPaginationResponse.totalPages > 0
        ) {
          this.filteredList = this.dataPaginationResponse.segments;
          if (this.currentPage <= 0) {
            this.currentPage++;
          }
        }
      },
      (errorData: HttpErrorResponse) => {
        console.log(errorData);
        this.onGetNotificationErrorDialog();
      }
    );
  }

  onConfirm(data: any): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: 'du segment ' + data.name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private onSave(data: any) {
    this.isSave = true;

    this.onSaveLoadingDialog();

    this.accountService.saveSegmentRemove(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.filteredList = [];
        this.onGetDataList();
        this.onSaveNotificationDialog();
      },
      (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.onSaveErrorNotificationDialog(error);
      }
    );
  }

  onSaveNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: 'La suppression du segment a réussi.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        dialogMessage: 'La suppression du segment a échoué.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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

  openSaveToggleEnableNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "L'opération a réussi.",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        dialogMessage: "L'opération a échoué.",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  onConfirmToggleEnabled(data: any, isToggle: boolean): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(
      ConfirmationToggleEnableDialogComponent,
      {
        hasBackdrop: false,
        width: '400px',
        height: '340px',
        data: {
          dialogMessage: 'le segment ' + data.name,
          isToggle: isToggle,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
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

    this.accountService.saveSegmentToggleEnable(data.id).subscribe(
      (responseData) => {
        this.isSave = false;
        this.closeDialog();
        this.onGetDataList();
        this.openSaveToggleEnableNotificationDialog();
      },
      (error: HttpErrorResponse) => {
        this.isSave = false;
        console.log(error);
        this.closeDialog();
        this.openSaveToggleEnableErrorNotificationDialog(error);
      }
    );
  }
/* 
  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
  } */

  filterResults(text: string) {
    if (!text) {
      this.filteredList = this.dataPaginationResponse.zones;
      return;
    }

    console.log(text);

    if (this.dataPaginationResponse && this.dataPaginationResponse.zones) {
      this.filteredList = this.dataPaginationResponse.zones.filter(
        // @ts-ignore
        (data) => data?.name.toLowerCase().includes(text.toLowerCase())
      );
    }
  }

  openSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(RemoveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
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
    this.rows = this.pageSize;
    this.pageNumber = 1;
    this.currentPage = 1;
    this.onGetDataList();
  }

  protected readonly environment = environment;

}
