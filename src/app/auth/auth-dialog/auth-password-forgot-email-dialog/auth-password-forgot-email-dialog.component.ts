import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-auth-password-forgot-email-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './auth-password-forgot-email-dialog.component.html',
  styleUrl: './auth-password-forgot-email-dialog.component.css'
})
export class AuthPasswordForgotEmailDialogComponent {

}
