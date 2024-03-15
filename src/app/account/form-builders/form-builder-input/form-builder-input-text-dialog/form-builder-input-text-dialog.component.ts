import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-builder-input-text-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgIf
  ],
  templateUrl: './form-builder-input-text-dialog.component.html',
  styleUrl: './form-builder-input-text-dialog.component.css'
})
export class FormBuilderInputTextDialogComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  inputForm = new FormGroup({
    idAndName: new FormControl("field_1", [Validators.required]),
    label: new FormControl(null),
    placeholder: new FormControl(null),
    maxlength: new FormControl(null),
    minlength: new FormControl(null),
    required: new FormControl(null)
  });

  currentSelectedTag: any = null;

  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.currentSelectedTag) {
      this.currentSelectedTag = this.data.currentSelectedTag;
    }

  }

  ngOnInit(): void {
    this.formGroup = this._fb.group(this.inputForm);
  }

}
