import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-auth-login-dialog',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './auth-login-dialog.component.html',
  styleUrl: './auth-login-dialog.component.css'
})
export class AuthLoginDialogComponent {

}
