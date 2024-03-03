import {Component, Inject, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-auth-error-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './auth-error-dialog.component.html',
  styleUrl: './auth-error-dialog.component.css'
})
export class AuthErrorDialogComponent implements OnInit {

  error: HttpErrorResponse | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.error = this.data.error;
  }

}
