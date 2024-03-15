import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../../../account.service";
import {DatePipe, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ImageModule} from "primeng/image";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-form-quotation-list',
  standalone: true,
  imports: [
    DatePipe,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatProgressSpinner,
    NgIf,
    ImageModule,
    SkeletonModule
  ],
  templateUrl: './form-quotation-list.component.html',
  styleUrl: './form-quotation-list.component.css'
})
export class FormQuotationListComponent implements OnInit, OnDestroy, AfterViewInit {

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

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Configuration des produits";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

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
    this._router.navigateByUrl("/account/settings-products/forms/quotations/add");
  }

  onView(element: any) {
  }

  onEdit(element: any) {
  }

  onGoToPrevious() {
    this.currentPage--;
    this.onGetDataList();
  }

  onGoToNext() {
    this.currentPage++;
    this.onGetDataList();
  }


  private onGetDataList() {
  }

}
