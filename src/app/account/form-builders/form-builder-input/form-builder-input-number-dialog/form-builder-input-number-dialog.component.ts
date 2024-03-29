import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
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
  selector: 'app-form-builder-input-number-dialog',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    InputTextModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './form-builder-input-number-dialog.component.html',
  styleUrl: './form-builder-input-number-dialog.component.css'
})
export class FormBuilderInputNumberDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  inputForm = new FormGroup({
    name: new FormControl(null),
    label: new FormControl(null),
    placeholder: new FormControl(null),
    max: new FormControl(null, [
      Validators.pattern(/^\d+(\.\d+)?$/)]),
    min: new FormControl(null, [
      Validators.pattern(/^\d+(\.\d+)?$/)]),
    required: new FormControl(false)
  });

  currentSelectedTag: any = null;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<FormBuilderInputNumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.currentSelectedTag) {
      this.currentSelectedTag = this.data.currentSelectedTag;
    }

  }

  ngOnInit(): void {

    if (this.data && this.data.formStepQuestion && this.data.formStepQuestion.value.attributes) {
      this.inputForm.patchValue({label: this.data.formStepQuestion.value.attributes.label});
      this.inputForm.patchValue({placeholder: this.data.formStepQuestion.value.attributes.placeholder});
      this.inputForm.patchValue({max: this.data.formStepQuestion.value.attributes.max});
      this.inputForm.patchValue({min: this.data.formStepQuestion.value.attributes.min});
      this.inputForm.patchValue({required: this.data.formStepQuestion.value.attributes.required});
    }

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
