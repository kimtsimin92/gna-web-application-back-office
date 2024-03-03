import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-add-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './add-loading-dialog.component.html',
  styleUrl: './add-loading-dialog.component.css'
})
export class AddLoadingDialogComponent {

}
