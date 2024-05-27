import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChipModule} from "primeng/chip";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditorModule} from "primeng/editor";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { AccountService } from '../../../../account.service';
import { ManagerCustomerAccountService } from '../../../manager-customers-accounts/manager-customer-account.service';
import { ConfirmationToggleDialogComponent } from '../../../../dialogs/confirmation/confirmation-toggle-dialog/confirmation-toggle-dialog.component';
import { SaveLoadingDialogComponent } from '../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component';
import { SaveNotificationDialogComponent } from '../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component';
import { SaveErrorNotificationDialogComponent } from '../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component';


import { TagModule } from 'primeng/tag';
import { environment } from '../../../../../../environments/environment';
import { SkeletonModule } from 'primeng/skeleton';
import { CampaignService } from '../campaign.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    ChipModule,
    MatCardContent,
    NgIf,
    DatePipe,
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    EditorModule,
    SkeletonModule,
    TagModule,
    NgForOf,
  ],
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.css'
})
export class CampaignDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  headerTitle: string | undefined;
  home: MenuItem | undefined;
  items: MenuItem[] | undefined;

  isSave: boolean = false;

  elementData: any;
  loadingPage: boolean = false;
  loading: boolean = false;
  
  protected readonly environment = environment;
  isLoadingFiles: boolean = false;

  minDate: Date = new Date()


  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService,
    private managerCustomerAccountService: ManagerCustomerAccountService,
    private campaignService: CampaignService,
  ) {
  }


  setStatus( dateFin: any) {
    const endDate = new Date(dateFin);
    if (endDate > this.minDate) {
      return  true
    } else {
      return false
    }
  }
  ngOnInit(): void {
    this.minDate = new Date();

    if (localStorage.getItem("CAMPAIGN_DATA")) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("CAMPAIGN_DATA"));
    } else {
      this._router.navigateByUrl("/account/marketing/campaigns/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Marketing";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'campagne'}];


    this.getCampaignById(this.elementData.id)
  }


  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("CAMPAIGN_DATA")) {
      localStorage.removeItem("CAMPAIGN_DATA");
    }
  }

  onGoToBack() {
    this._router.navigateByUrl("/account/marketing/campaigns/list");
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/marketing/campaigns/add")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("CAMPAIGN_DATA", JSON.stringify(this.elementData));

        this.loadingPage = false;
      });

  }
  
  getCampaignById(id: any) {
    this.isLoadingFiles = true;

    this.campaignService.getCampaignById(id).subscribe(
        (responseData: HttpResponse<any>) => {
          this.isLoadingFiles = false;
          console.log(responseData);

          let responseBody = responseData['body'];

        },
        (errorData: HttpErrorResponse) => {
          this.isLoadingFiles = false;

          console.log(errorData);
        }
      );
  }
  
  onGetCampaignFilesById(element: any) {
    this.isLoadingFiles = true;
    
    if (element && element.image) {
      this.isLoadingFiles = false;
    } 
    this.isLoadingFiles = false

  }

}
