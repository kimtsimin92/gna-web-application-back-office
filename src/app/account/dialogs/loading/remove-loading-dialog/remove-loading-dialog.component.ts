import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-remove-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './remove-loading-dialog.component.html',
  styleUrl: './remove-loading-dialog.component.css'
})
export class RemoveLoadingDialogComponent {

}
