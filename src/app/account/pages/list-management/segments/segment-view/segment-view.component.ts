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
  selector: 'app-segment-view',
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
  templateUrl: './segment-view.component.html',
  styleUrl: './segment-view.component.css'
})
export class SegmentViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  segmentData: any = null;
  loadingPage: boolean = true;
  isDisable: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("SEGMENT_DATA")) {
      // @ts-ignore
      this.segmentData = JSON.parse(localStorage.getItem("SEGMENT_DATA"));
    } else {
      this._router.navigateByUrl("/account/segments/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Segments";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Segments'}];

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("SEGMENT_DATA")) {
      localStorage.removeItem("SEGMENT_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/segments/list");
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/segments/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("SEGMENT_DATA", JSON.stringify(this.segmentData));

        this.loadingPage = false;
      });

  }

}
