import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-session-alert-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatDialogClose,
    NgIf,
    DatePipe
  ],
  templateUrl: './session-alert-dialog.component.html',
  styleUrl: './session-alert-dialog.component.css'
})
export class SessionAlertDialogComponent implements OnInit {

  alertMessage: string | undefined;
  startTime: any;
  endTime: any;
  differenceTime: any;
  expirationTime: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.alertMessage = data;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.expirationTime = new Date(this.alertMessage).toLocaleString();
    // @ts-ignore
    this.startTime = new Date().getTime();
    // @ts-ignore
    this.endTime = new Date(this.alertMessage).getTime();
    let differenceTime = this.endTime - this.startTime;
    this.differenceTime = Math.round(differenceTime / 60000)
  }
}
