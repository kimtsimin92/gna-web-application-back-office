import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirmation-add-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatDialogClose
  ],
  templateUrl: './confirmation-add-dialog.component.html',
  styleUrl: './confirmation-add-dialog.component.css'
})
export class ConfirmationAddDialogComponent implements OnInit {

  dialogMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage
  }

  ngOnInit(): void {

}

}
