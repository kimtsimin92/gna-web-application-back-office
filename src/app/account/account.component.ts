import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {AuthService} from "../auth/auth.service";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AccountService} from "./account.service";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {GnaLoadingComponent} from "./transitions/gna-loading/gna-loading.component";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-account',
  standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        SidenavComponent,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatProgressBar,
        NgIf,
        MatProgressSpinner,
        GnaLoadingComponent,
    ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, AfterViewInit {


  @Input() drawerToggle: boolean = false;

  headerTitle: string | undefined;

  constructor(
    private responsive: BreakpointObserver,
    private _router: Router,
    private _route: ActivatedRoute,
    public auth: AuthService,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {

    this.accountService.loadingPage = true;
    setTimeout(() => {
      this.accountService.loadingPage = false;
    }, 1000);

    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches XSmall");
          this.drawerToggle = false;
        }

      });

    this.responsive.observe(Breakpoints.Small)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches Small");
          this.drawerToggle = true;
        }

      });

    this.responsive.observe(Breakpoints.Large)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches Large");
          this.drawerToggle = true;
        }

      });

    this.responsive.observe(Breakpoints.XLarge)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches XLarge");
          this.drawerToggle = true;
        }

      });


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.accountService.onGetTokenExpirationTime();
    }, 1000);
  }

  onToggle($event: any) {
    this.drawerToggle = $event;
  }


}
