import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

import {DomSanitizer, Title} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {GnaLoadingComponent} from "./account/transitions/gna-loading/gna-loading.component";
import {AccountService} from "./account/account.service";

import * as fr from '@angular/common/locales/fr';
import {AuthService} from "./auth/auth.service";


@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, GnaLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {


  constructor(
    private _title: Title,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    public auth: AuthService,
    public accountService: AccountService) {
    this._matIconRegistry.addSvgIcon(
      "delete",
      this._domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/delete.svg")
    );
  }


  ngOnInit(): void {

    this.auth.isAuth();

    if (!this.auth.authJwt?.loginFirstTime) {
      this._router.navigateByUrl("/login/first-time");
    }

    registerLocaleData(fr.default);

  }

  ngAfterViewInit(): void {
  }


}
