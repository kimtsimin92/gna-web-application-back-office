import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MenuItem} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {FieldsetModule} from "primeng/fieldset";

@Component({
  selector: 'app-partner-view',
  standalone: true,
  imports: [
    BreadcrumbModule,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    FieldsetModule
  ],
  templateUrl: './partner-view.component.html',
  styleUrl: './partner-view.component.css'
})
export class PartnerViewComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  partnerData: any = null;
  loadingPage: boolean = true;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("PARTNER_DATA")) {
      // @ts-ignore
      this.partnerData = JSON.parse(localStorage.getItem("PARTNER_DATA"));
    } else {
      this._router.navigateByUrl("/account/partners/list")
    }

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Partenaires";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.home = { icon: 'pi pi-home', routerLink: '/account/home' };

    this.items = [{ label: 'Gestion Listes' }, { label: 'Partenaires'}];

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("PARTNER_DATA")) {
      localStorage.removeItem("PARTNER_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/partners/list");
  }

  onGoToEdit() {
    this.loadingPage = true;

    this._router.navigateByUrl("/account/partners/edit")
      .then(() => {
        // @ts-ignore
        localStorage.setItem("PARTNER_DATA", JSON.stringify(this.partnerData));

        this.loadingPage = false;
      });

  }
}
