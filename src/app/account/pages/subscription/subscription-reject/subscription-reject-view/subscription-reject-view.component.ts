import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

import {environment} from "../../../../../../environments/environment";
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-subscription-reject-view',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    TagModule,
    NgForOf
  ],
  templateUrl: './subscription-reject-view.component.html',
  styleUrl: './subscription-reject-view.component.css'
})
export class SubscriptionRejectViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  elementData: any = null;

  isSave: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  loadingPage: boolean = false;
  isDisable: boolean = true;

  constructor(
    private _router: Router,
  ) {
  }


  ngOnInit(): void {

    if (localStorage.getItem("SUBSCRIPTION_DATA")) {

      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("SUBSCRIPTION_DATA"));

    } else {
      this._router.navigateByUrl("/account/subscriptions/rejects/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des souscriptions";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }


  ngOnDestroy(): void {
    localStorage.removeItem("SUBSCRIPTION_DATA");
  }


  onBack() {
    this._router.navigateByUrl("/account/subscriptions/rejects/list")
  }

  protected readonly environment = environment;

}
