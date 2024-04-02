import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form-builder-input-email-dialog',
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
  templateUrl: './form-builder-input-email-dialog.component.html',
  styleUrl: './form-builder-input-email-dialog.component.css'
})
export class FormBuilderInputEmailDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  inputForm = new FormGroup({
    name: new FormControl(null),
    label: new FormControl(null),
    placeholder: new FormControl(null),
    maxlength: new FormControl(null, [
      Validators.pattern(/^[0-9]*$/)]),
    minlength: new FormControl(null, [
      Validators.pattern(/^[0-9]*$/)]),
    pattern: new FormControl(null),
    required: new FormControl(false),
    text: new FormControl(true),
  });

  currentSelectedTag: any = null;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<FormBuilderInputEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.currentSelectedTag) {
      this.currentSelectedTag = this.data.currentSelectedTag;
    }

  }

  ngOnInit(): void {

    if (this.data && this.data.formStepQuestion && this.data.formStepQuestion.value.attributes) {
      this.inputForm.patchValue({label: this.data.formStepQuestion.value.attributes.label});
      this.inputForm.patchValue({placeholder: this.data.formStepQuestion.value.attributes.placeholder});
      this.inputForm.patchValue({maxlength: this.data.formStepQuestion.value.attributes.maxlength});
      this.inputForm.patchValue({minlength: this.data.formStepQuestion.value.attributes.minlength});
      this.inputForm.patchValue({pattern: this.data.formStepQuestion.value.attributes.pattern});
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
