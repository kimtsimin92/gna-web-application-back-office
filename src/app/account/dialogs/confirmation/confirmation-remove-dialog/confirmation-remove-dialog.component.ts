import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-confirmation-remove-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatDialogClose,
    MatIcon
  ],
  templateUrl: './confirmation-remove-dialog.component.html',
  styleUrl: './confirmation-remove-dialog.component.css'
})
export class ConfirmationRemoveDialogComponent implements OnInit {

  dialogMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage
  }

  ngOnInit(): void {

  }

}
