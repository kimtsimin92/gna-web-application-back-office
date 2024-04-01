import { Component } from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-simulation-quotation-loading-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatProgressSpinner
    ],
  templateUrl: './simulation-quotation-loading-dialog.component.html',
  styleUrl: './simulation-quotation-loading-dialog.component.css'
})
export class SimulationQuotationLoadingDialogComponent {

}
