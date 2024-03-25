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
import {DropdownModule} from "primeng/dropdown";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-premium-calculation-modality-dialog',
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
    MatDialogClose,
    DropdownModule,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatInput
  ],
  templateUrl: './premium-calculation-modality-dialog.component.html',
  styleUrl: './premium-calculation-modality-dialog.component.css'
})
export class PremiumCalculationModalityDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = new FormGroup({}, undefined, undefined);
  inputForm = new FormGroup({
    modality: new FormControl(1, [Validators.required]),
    amount: new FormControl(null, [Validators.min(1),
        Validators.pattern(/^\d+(\.\d+)?$/)]),
    parameter: new FormControl(null,
      [Validators.pattern(/^\d+(\.\d+)?$/)]),
    variable: new FormControl(null)
  });

  outputData: any = null;

  modalitySelected: any = null;

  modalityList: any[] = [
    {
      code: 1,
      name: "Valeur Fixe"
    },
    {
      code: 2,
      name: "Valeur Fixe x Paramètre"
    },
    {
      code: 3,
      name: "Valeur Fixe x Paramètre x Variable"
    }
  ];

  variableList: any[] = [];

  symbolParameterCode: number = 1;
  symbolVariableCode: number = 1;
  parameterAction: number = 1;
  variableAction: number = 1;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<PremiumCalculationModalityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.outputData) {
      this.outputData = this.data.outputData;
    }

  }

  ngOnInit(): void {

    if (this.data && this.data.outputData) {
        this.inputForm.patchValue({amount: this.data.outputData.amount});
    }

    if (this.data && this.data.variableList) {
      this.variableList = this.data.variableList;
    }


  }

  ngOnDestroy(): void {
    this.outputData = null;
  }

  onNoClick(): void {
    this.outputData = null;
    this.dialogRef.close();
  }


  onGetParameterAction(number: number) {
    this.symbolParameterCode = number;
  }

  onGetVariableAction(number: number) {
    this.symbolVariableCode = number;
  }

}
