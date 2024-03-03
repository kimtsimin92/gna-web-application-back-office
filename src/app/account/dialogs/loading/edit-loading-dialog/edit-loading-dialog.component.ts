import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-edit-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './edit-loading-dialog.component.html',
  styleUrl: './edit-loading-dialog.component.css'
})
export class EditLoadingDialogComponent {

}
