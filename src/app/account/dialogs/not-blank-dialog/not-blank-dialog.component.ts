import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-not-blank-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatDialogClose
  ],
  templateUrl: './not-blank-dialog.component.html',
  styleUrl: './not-blank-dialog.component.css'
})
export class NotBlankDialogComponent {

}
