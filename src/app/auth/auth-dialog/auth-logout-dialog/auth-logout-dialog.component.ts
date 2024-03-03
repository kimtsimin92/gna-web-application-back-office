import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-auth-logout-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './auth-logout-dialog.component.html',
  styleUrl: './auth-logout-dialog.component.css'
})
export class AuthLogoutDialogComponent {

}
