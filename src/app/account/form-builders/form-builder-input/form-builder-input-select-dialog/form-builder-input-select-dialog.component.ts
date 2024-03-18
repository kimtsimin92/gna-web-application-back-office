import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-builder-input-select-dialog',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './form-builder-input-select-dialog.component.html',
  styleUrl: './form-builder-input-select-dialog.component.css'
})
export class FormBuilderInputSelectDialogComponent implements OnInit, OnDestroy {

  optionsData = "Option 1\nOption 2";
  valuesData = "1\n2";

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  inputForm = new FormGroup({
    name: new FormControl(null),
    label: new FormControl(null),
    multiple: new FormControl(null),
    options: new FormControl(this.optionsData),
    values: new FormControl(this.valuesData),
    required: new FormControl(null)
  });

  currentSelectedTag: any = null;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<FormBuilderInputSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.currentSelectedTag) {
      this.currentSelectedTag = this.data.currentSelectedTag;
    }

  }

  ngOnInit(): void {
    // @ts-ignore
    this.inputForm.setControl("name", new FormControl("step"+this.currentSelectedTag.stepIndex+"_field"+this.currentSelectedTag.questionIndex))
    this.formGroup = this._fb.group(this.inputForm);

  }

  ngOnDestroy(): void {
    this.currentSelectedTag = null;
  }

  onNoClick(): void {
    this.currentSelectedTag = null;
    this.dialogRef.close();
  }

}
