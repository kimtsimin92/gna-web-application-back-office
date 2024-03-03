import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gna-loading',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './gna-loading.component.html',
  styleUrl: './gna-loading.component.css'
})
export class GnaLoadingComponent {

}
