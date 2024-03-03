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
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-save-notification-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    NgIf,
    MatIcon
  ],
  templateUrl: './save-notification-dialog.component.html',
  styleUrl: './save-notification-dialog.component.css'
})
export class SaveNotificationDialogComponent implements OnInit {

  dialogMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogMessage = data.dialogMessage
  }

  ngOnInit(): void {
  }

}
