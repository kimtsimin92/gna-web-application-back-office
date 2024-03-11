import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-guarantee-clause-editor-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogContent,
    EditorModule,
    ReactiveFormsModule,
    MatDialogTitle,
    FormsModule,
    NgIf,
  ],
  templateUrl: './guarantee-clause-editor-dialog.component.html',
  styleUrl: './guarantee-clause-editor-dialog.component.css'
})
export class GuaranteeClauseEditorDialogComponent implements OnInit {

  clauses: any;
  isView: boolean = false;

  constructor(public _dialogRef: MatDialogRef<GuaranteeClauseEditorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && data.clauses) {
      this.clauses = data.clauses;
    }
    if (this.data && data.isView) {
      this.isView = data.isView;
    }
  }

  ngOnInit(): void {
  }

}
