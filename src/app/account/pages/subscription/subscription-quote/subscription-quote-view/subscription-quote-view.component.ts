import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChipModule} from "primeng/chip";
import {CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {TagModule} from "primeng/tag";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {environment} from "../../../../../../environments/environment";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-subscription-quote-view',
  standalone: true,
  imports: [
    ChipModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    LowerCasePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    TagModule,
    NgForOf,
    SkeletonModule
  ],
  templateUrl: './subscription-quote-view.component.html',
  styleUrl: './subscription-quote-view.component.css'
})
export class SubscriptionQuoteViewComponent implements OnInit, OnDestroy {

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

    if (localStorage.getItem("QUOTE_DATA")) {

      // @ts-ignore
      this.elementData = JSON.parse(localStorage.getItem("QUOTE_DATA"));

    } else {
      this._router.navigateByUrl("/account/subscriptions/quotes/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des souscriptions";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

  }


  ngOnDestroy(): void {
    localStorage.removeItem("QUOTE_DATA");
  }


  onBack() {
    this._router.navigateByUrl("/account/subscriptions/quotes/list")
  }

  protected readonly environment = environment;
}
