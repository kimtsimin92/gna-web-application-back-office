import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-password-forgot-email-error-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    NgIf,
    MatDialogClose
  ],
  templateUrl: './auth-password-forgot-email-error-dialog.component.html',
  styleUrl: './auth-password-forgot-email-error-dialog.component.css'
})
export class AuthPasswordForgotEmailErrorDialogComponent implements OnInit {

  error: HttpErrorResponse | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.error = this.data.error;
  }
}
