import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-error-notification-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './error-notification-dialog.component.html',
  styleUrl: './error-notification-dialog.component.css'
})
export class ErrorNotificationDialogComponent implements OnInit {

  error: HttpErrorResponse | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data && this.data.error) {
      this.error = this.data.error;
    }
  }

}
