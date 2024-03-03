import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-save-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './save-loading-dialog.component.html',
  styleUrl: './save-loading-dialog.component.css'
})
export class SaveLoadingDialogComponent {

}
