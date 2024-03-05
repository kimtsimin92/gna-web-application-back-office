import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-branch-view',
  standalone: true,
    imports: [
        BreadcrumbModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        InputTextModule,
        ReactiveFormsModule
    ],
  templateUrl: './branch-view.component.html',
  styleUrl: './branch-view.component.css'
})
export class BranchViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  branchData: any = null;
  loadingPage: boolean = true;
  isDisable: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("BRANCH_DATA")) {
      // @ts-ignore
      this.branchData = JSON.parse(localStorage.getItem("BRANCH_DATA"));
    } else {
      this._router.navigateByUrl("/account/branches/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Gestion des listes";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Branches'}];

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("BRANCH_DATA")) {
      localStorage.removeItem("BRANCH_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/branches/list");
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/branches/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("BRANCH_DATA", JSON.stringify(this.branchData));

        this.loadingPage = false;
      });

  }

}
