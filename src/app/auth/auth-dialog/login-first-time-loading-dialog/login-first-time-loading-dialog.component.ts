import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login-first-time-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './login-first-time-loading-dialog.component.html',
  styleUrl: './login-first-time-loading-dialog.component.css'
})
export class LoginFirstTimeLoadingDialogComponent {

}
