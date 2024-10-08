import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-zone-view',
  standalone: true,
    imports: [
        BreadcrumbModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule
    ],
  templateUrl: './zone-view.component.html',
  styleUrl: './zone-view.component.css'
})
export class ZoneViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  zoneData: any = null;
  loadingPage: boolean = true;
  isDisable: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("ZONE_DATA")) {
      // @ts-ignore
      this.zoneData = JSON.parse(localStorage.getItem("ZONE_DATA"));
    } else {
      this._router.navigateByUrl("/account/settings/lists/zones/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Territoires";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/settings/lists/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Territoires'}];

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("ZONE_DATA")) {
      localStorage.removeItem("ZONE_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings/lists/zones/list");
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/settings/lists/zones/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("ZONE_DATA", JSON.stringify(this.zoneData));

        this.loadingPage = false;
      });

  }

}
