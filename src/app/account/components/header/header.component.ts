import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Input,
  NgZone, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal, SimpleChanges
} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {AuthService} from "../../../auth/auth.service";
import {NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AccountService} from "../../account.service";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {
  ErrorNotificationDialogComponent
} from "../../dialogs/notification/error-notification-dialog/error-notification-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuItem,
    MatMenu,
    MatIconButton,
    MatToolbar,
    MatToolbarRow,
    MatMenuTrigger,
    MatButton,
    NgIf,
    SlicePipe,
    RouterLink,
    MatProgressBar,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit, DoCheck, OnDestroy {

  @Input()
  headerTitle: string | undefined;

  @Output() drawerEvent = new EventEmitter<boolean>();
  isToggle: boolean = false;

  userData: any = null;

  constructor(
    public auth: AuthService,
    private _title: Title,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    console.log(this._title.getTitle());
    this.userData = this.accountService.getUserData();
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      // @ts-ignore
      this.headerTitle = null;
      setTimeout(() => {
        // @ts-ignore
        this.headerTitle = localStorage.getItem("APP_HEADER_TITLE");
      }, 200);
    }
    this.onDrawerToggle();
  }

  ngAfterViewInit(): void {
      if (localStorage.getItem("APP_HEADER_TITLE")) {
        // @ts-ignore
        this.headerTitle = null;
        setTimeout(() => {
          // @ts-ignore
          this.headerTitle = localStorage.getItem("APP_HEADER_TITLE");
        }, 200);
      }
  }

  ngDoCheck(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      setTimeout(() => {
        // @ts-ignore
        this.headerTitle = localStorage.getItem("APP_HEADER_TITLE");
      }, 200);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
  }

  onDrawerToggle() {
    this.isToggle = !this.isToggle;
    this.drawerEvent.emit(this.isToggle);
  }

  onGoToProfile(url: string) {

    this.accountService.pageLoading = true;

    let requestData = {
      jwt: null,
      username: this.userData.username
    }

    console.log(requestData);

    this.accountService.getUserProfile(requestData)
      .subscribe((responseData) => {

        console.log(responseData);

        let data = responseData["body"];

        // @ts-ignore
        localStorage.setItem("USER_PROFILE_DATA", JSON.stringify(data));

        this._router.navigateByUrl(url).then(() => {
          this.accountService.pageLoading = false;
        });

      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.accountService.pageLoading = false;
        this.openNotificationErrorDialog();
      });

  }

  onGoTo(url: string) {
    this.accountService.pageLoading = true;
    setTimeout(() => {
      this._router.navigateByUrl(url).then(() => {
        this.accountService.pageLoading = false;
      });
    }, 500);
  }

  openNotificationErrorDialog(): void {

    const dialogRef = this._dialog.open(ErrorNotificationDialogComponent, {
      width: '440px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.closeDialog();
      }
    });

  }

  closeDialog() {
    this._dialog.closeAll();
  }


}
