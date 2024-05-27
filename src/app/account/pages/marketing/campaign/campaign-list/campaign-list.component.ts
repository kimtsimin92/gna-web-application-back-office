import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import { ManagerCustomerAccountService } from '../../../manager-customers-accounts/manager-customer-account.service';
import { environment } from '../../../../../../environments/environment';
import { CampaignService } from '../campaign.service';
import { ConfirmationRemoveDialogComponent } from '../../../../dialogs/confirmation/confirmation-remove-dialog/confirmation-remove-dialog.component';
import { AccountService } from '../../../../account.service';
import { RemoveLoadingDialogComponent } from '../../../../dialogs/loading/remove-loading-dialog/remove-loading-dialog.component';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DecimalPipe,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatMenu,
    MatMenuItem,
    MatProgressSpinner,
    NgForOf,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule,
    FormsModule,
    MatMenuTrigger,
    NgClass,
    RippleModule,
    NgIf,
    NgStyle
  ],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css'
})
export class CampaignListComponent implements OnInit, AfterViewInit, OnDestroy  {

  loadingPage: boolean = false;
  isSave: boolean = false;

  headerTitle: string | undefined;

  scrollHeight: string = "380px";

  pageSort: string = "-created_at";
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
  totalPages: number = 0;
  currentPage: number = 1;

  dataList: any[] = [];

  fakeDataList: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5},  {id: 6}];
  fakeDataListOne: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
  fakeDataListTwo: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}];

  statusList: any[] = [
    { label: 'En Attente', value: '1' },
    { label: 'Validé', value: '2' },
    { label: 'Refusé', value: '3' },
  ];

  dataPaginationResponse: any = null;

  loading: boolean = false;
  rows = 0;
  totalRecords: number = 0;

  isLoadingFiles: boolean = true;

  data :any = [
    {
      id: 1,
      code: '001',
      name: 'Segment 1'
    },
    {
      id: 2,
      code: '002',
      name: 'Segment2'
    },
    {
      id: 3,
      code: '003',
      name: 'S3'
    },
    {
      id: 4,
      code: '004',
      name: 'S4'
    },
    {
      id: 5,
      code: '005',
      name: 'S5'
    },
    {
      id: 6,
      code: '006',
      name: 'S6'
    },

    {
      id: 7,
      code: '007',
      name: 'S7'
    },
    ]

    segment:any
    minDate: Date = new Date()
    isDisable: boolean = true;
  filteredList:any[] = [];


  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    private campaignService: CampaignService, 
    public accountService: AccountService
   ) {
  }

  ngOnInit(): void {
    this.minDate = new Date();

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
          this.fakeDataList = this.fakeDataListTwo;
          this.onGetDataList();
        }

      });

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Campagnes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onGetDataList() {

    this.loadingPage = true;
    this.loading = true;

    console.log(this.currentPage);

      this.pageNumber = this.currentPage;

    let filter = {
      type_customer_id: "1",
      is_valid: true
    };

    this.dataList = [];

    this.campaignService.getCampaignList(filter, this.pageNumber, this.pageSize, this.pageSort)
      .subscribe((responseData: HttpResponse<any>) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(responseData);

        this.dataPaginationResponse = responseData['body'];

        if (this.dataPaginationResponse && this.dataPaginationResponse.pagination) {

          this.dataPaginationResponse.pageSize = this.dataPaginationResponse.pagination.limit;
          this.dataPaginationResponse.totalPages = this.dataPaginationResponse.pagination.total_pages;
          this.dataPaginationResponse.totalElements = this.dataPaginationResponse.pagination.total_records;

          this.totalRecords = this.dataPaginationResponse.totalElements;

          if (this.dataPaginationResponse.totalPages > 0) {

            
            this.dataList = this.dataPaginationResponse.data;

            if (this.currentPage <= 0) {
              this.currentPage++;
            }

          }

        }

      }, (errorData: HttpErrorResponse) => {

        this.loadingPage = false;
        this.loading = false;

        console.log(errorData);

      });


  }

  // to remove after   
  getSegment(id:any) {
    this.data.forEach((element:any) => {
      if (element.id  == id) {
        this.segment = element
      }
    });
    return this.segment.name
  }

  setStatus( dateFin: any) {
    const endDate = new Date(dateFin);
    if (endDate > this.minDate) {
      return  true
    } else {
      return false
    }
  }
  onGetCampaignFilesById(element: any) {
    this.isLoadingFiles = true;
    
    if (element && element.image) {
      this.isLoadingFiles = false;
    } 
    this.isLoadingFiles = false

  }
  onViewEdit(data: any) {
    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem('CAMPAIGN_DATA', JSON.stringify(data));

    this._router.navigateByUrl('/account/marketing/campaigns/edit').then(() => {
      this.loadingPage = false;
    });
  }
  
  onGoToSave() {
    this._router.navigateByUrl("/account/marketing/campaigns/add");
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

  onGoToView(data: any) {

    this.loadingPage = true;
    console.info(data);

    // @ts-ignore
    localStorage.setItem("CAMPAIGN_DATA", JSON.stringify(data));

    this._router.navigateByUrl("/account/marketing/campaigns/view")
      .then(() => {
        this.loadingPage = false;
      });

  }

  loadCarsLazy(event: any) {

    setTimeout(() => {
      // @ts-ignore
      event.forceUpdate();
    }, Math.random() * 1000 + 250);
  }
  protected readonly environment = environment;


  
  onSaveLoadingDialog(): void {
    const dialogRef = this._dialog.open(RemoveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  closeDialog() {
    this._dialog.closeAll();
  }

  private onSave(data: any) {
    this.isSave = true;

    this.onSaveLoadingDialog();

    this.campaignService.onDeleteCampaign(data.id).subscribe(
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

  
  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {
    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        httpError: error,
        dialogMessage: 'La suppression de la campagne a échoué.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

  
  onSaveNotificationDialog(): void {
    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '440px',
      data: {
        dialogMessage: 'La suppression de la campagne a réussi.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }
  onConfirm(data: any): void {
    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationRemoveDialogComponent, {
      hasBackdrop: false,
      width: '380px',
      height: '350px',
      data: {
        dialogMessage: "de la campagne '" + data.libelle +" '",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.pageNumber = 0;
        this.currentPage = 0;
        this.onSave(data);
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }
    });
  }

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
  
}
