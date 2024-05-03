import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {Event, Router} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    NgForOf,
    MatProgressBar,
    MatCard,
    MatCardContent,
    MatCardHeader,
    BreadcrumbModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  headerTitle: string | undefined;

  loadingPage: boolean = false;

  appsData: any[] = [
    {id: 1, name: "Gestion des garanties", img: "assets/gna/images/produiticon_76454_produit_1640283985.png", url: ""},
    {id: 2, name: "Gestion des produits", img: "assets/gna/images/produiticon_17786_produit_1640283717.png", url: ""},
    {id: 3, name: "Gestion des comptes clients", img: "assets/gna/images/produiticon_25150_produit_1640284050.png", url: ""},
    {id: 4, name: "Gestion des utilisateurs", img: "assets/gna/images/produiticon_69991_produit_1640283906.png", url: ""},
  ];

  apps: any[] = [];

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  constructor(
              public _dialog: MatDialog,
              private _router: Router,) { }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    this.headerTitle = "Tableau de bord";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.apps = this.appsData;

    this.items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.apps = this.appsData.filter(data => data.name.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  onGoToPage(url: string) {
    this.loadingPage = true;
    setTimeout(() => {
      this._router.navigateByUrl(url)
        .then(() => {
          this.loadingPage = false;
        });
    }, 100);
  }

}
