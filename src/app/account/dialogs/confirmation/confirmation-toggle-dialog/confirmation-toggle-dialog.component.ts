import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirmation-toggle-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    NgIf,
    MatDialogClose
  ],
  templateUrl: './confirmation-toggle-dialog.component.html',
  styleUrl: './confirmation-toggle-dialog.component.css'
})
export class ConfirmationToggleDialogComponent implements OnInit {

  dialogMessage: string | undefined;
  isToggle: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage
    if (data.isToggle) {
      this.isToggle = data.isToggle;
    }
  }

  ngOnInit(): void {

  }
}
