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
   // multiple: new FormControl(false),
    options: new FormControl(this.optionsData),
    values: new FormControl(this.valuesData),
    required: new FormControl(false)
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

    if (this.data && this.data.formStepQuestion && this.data.formStepQuestion.value.attributes) {
      if (this.data.formStepQuestion.value.attributes.label) {
        this.inputForm.patchValue({label: this.data.formStepQuestion.value.attributes.label});
      }
    /*  if (this.data.formStepQuestion.value.attributes.multiple) {
        this.inputForm.patchValue({multiple: this.data.formStepQuestion.value.attributes.multiple});
      }*/
      if (this.data.formStepQuestion.value.attributes.options) {
        let optionString1 = this.data.formStepQuestion.value.attributes.options;
        let optionsString2 = optionString1.join(',');
        let options = optionsString2.replace(/,/g, '\n');
        this.inputForm.patchValue({options: options});
      }
      if (this.data.formStepQuestion.value.attributes.values) {
        let valueString1 = this.data.formStepQuestion.value.attributes.values;
        let valueString2 = valueString1.join(',');
        let values = valueString2.replace(/,/g, '\n');
        this.inputForm.patchValue({values: values});
      }
      if (this.data.formStepQuestion.value.attributes.required) {
        this.inputForm.patchValue({required: this.data.formStepQuestion.value.attributes.required});
      }
    }

    // @ts-ignore
    this.inputForm.setControl("name", new FormControl("step" + this.currentSelectedTag.stepIndex + "_field" + this.currentSelectedTag.questionIndex))
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
