import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {SkeletonModule} from "primeng/skeleton";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";

@Component({
  selector: 'app-form-subscription-list',
  standalone: true,
    imports: [
        DatePipe,
        InputTextModule,
        MatButton,
        MatCard,
        MatCardHeader,
        SkeletonModule
    ],
  templateUrl: './form-subscription-list.component.html',
  styleUrl: './form-subscription-list.component.css'
})
export class FormSubscriptionListComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  totalPages: number = 0;
  currentPage: number = 0;

  dataPaginationResponse: any;
  filteredList: any[] = [];


  isLoading: boolean = false;

  isReadonly: boolean = true;
  isDisable: boolean = true;

  fakeItems: any[] = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];
  loadingPage: boolean = false;

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    public accountService: AccountService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("FORM_SUBSCRIPTION_DATA")) {
      localStorage.removeItem("FORM_SUBSCRIPTION_DATA");
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetDataList();

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  filterResults(text: string) {

    if (!text) {
      this.filteredList = this.dataPaginationResponse.data;
      return;
    }

    if (this.dataPaginationResponse && this.dataPaginationResponse.data) {
      this.filteredList = this.dataPaginationResponse.data.filter(
        // @ts-ignore
        item => item?.name.toLowerCase().includes(text.toLowerCase())
      );
    }

  }

  onAdd() {
    this._router.navigateByUrl("/account/settings-products/forms/subscriptions/add");
  }

  onView(element: any) {
  }

  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
  }

  onGetDataList() {

    let page = 0;

    if (this.currentPage > 0) {
      page = this.currentPage - 1;
    } else {
      page = this.currentPage;
    }

    this.accountService.getFormSubscriptions(page)
      .subscribe((responseData: HttpResponse<any>) => {
        console.log(responseData);
        this.dataPaginationResponse = responseData["body"];
        if (this.dataPaginationResponse && this.dataPaginationResponse.totalPages > 0) {

          if (this.dataPaginationResponse.data && this.dataPaginationResponse.data.length > 0) {
            this.dataPaginationResponse.data.forEach((qf: any) => {
              if (qf.steps && qf.steps.length > 0) {
                qf.steps.forEach((s: any) => {
                  if (s.questions && s.questions.length > 0) {
                    s.questions.forEach((q: any) => {
                      if (q.field) {
                        q.field = JSON.parse(q.field);
                      }
                    });
                  }
                });
              }
            });
          }

          this.filteredList = this.dataPaginationResponse.data;
          console.log(this.filteredList);
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

  closeDialog() {
    this._dialog.closeAll();
  }

  onEdit(item: any) {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("FORM_SUBSCRIPTION_DATA", JSON.stringify(item));

    this._router.navigateByUrl("/account/settings-products/forms/subscriptions/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }



}
