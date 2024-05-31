import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {DatePipe, NgIf} from "@angular/common";
import {TagModule} from "primeng/tag";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";

@Component({
  selector: 'app-product-category-view',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    TagModule,
    DatePipe
  ],
  templateUrl: './product-category-view.component.html',
  styleUrl: './product-category-view.component.css'
})
export class ProductCategoryViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  elementData: any = null;
  loadingPage: boolean = true;
  isDisable: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("CATEGORY_DATA")) {
      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("CATEGORY_DATA"));
    } else {
      this._router.navigateByUrl("/account/settings/lists/categories/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des listes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/categories/list");
  }


  onViewEdit() {
    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem('CATEGORY_DATA', JSON.stringify(this.elementData));

    this._router.navigateByUrl('/account/settings/lists/categories/edit').then(() => {
      this.loadingPage = false;
    });
  }
}
