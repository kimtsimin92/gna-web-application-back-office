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

@Component({
  selector: 'app-confirmation-edit-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
  ],
  templateUrl: './confirmation-edit-dialog.component.html',
  styleUrl: './confirmation-edit-dialog.component.css'
})
export class ConfirmationEditDialogComponent implements OnInit {

  dialogMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage
  }

  ngOnInit(): void {
  }

}
