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

  symbolParameterCode: number = 7;
  symbolVariableCode: number = 7;
  parameterAction: number = 1;
  variableAction: number = 1;

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<PremiumCalculationModalityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (this.data && this.data.outputData) {

      this.variableList = [];

      this.outputData = this.data.outputData;

      if (this.outputData && this.outputData.modality) {
        this.inputForm.patchValue({modality: this.outputData.modality});
      } else {
        this.inputForm.patchValue({modality: 1});
      }

      if (this.outputData && this.outputData.amount) {
        this.inputForm.patchValue({amount: this.outputData.amount});
      }

      if (this.outputData && this.outputData.operatorParameter) {
        this.symbolParameterCode = this.outputData.operatorParameter.typeCode;
        this.onGetParameterAction(this.outputData.operatorParameter.typeCode, this.outputData.operatorParameter.typeValue)
      }

      if (this.outputData && this.outputData.parameter) {
        this.inputForm.patchValue({parameter: this.outputData.parameter});
      }

      if (this.outputData && this.outputData.operatorVariable) {
        this.symbolVariableCode = this.outputData.operatorVariable.typeCode;
        this.onGetVariableAction(this.outputData.operatorVariable.typeCode, this.outputData.operatorVariable.typeValue)
      }

      if (this.outputData && this.outputData.variable) {
        this.inputForm.patchValue({variable: this.outputData.variable.name});
      }

    }

    if (this.data && this.data.variableList && this.data.variableList.length > 0) {
      this.variableList = [];
      this.data.variableList.forEach((vl: any) =>  {
        if (vl.typeCode == 2 || !vl.text) {
          this.variableList.push(vl);
        }
      });

    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.variableList = [];
    this.outputData = null;
  }

  onNoClick(): void {
    this.outputData = null;
    this.variableList = [];
    this.dialogRef.close();
  }


  onGetParameterAction(code: number, value: string) {
    this.symbolParameterCode = code;
    let operatorParameter = {
      typeCode: code,
      typeValue: value,
      label: null
    }
    // @ts-ignore
    this.inputForm.setControl("operatorParameter", new FormControl(operatorParameter));
  }

  onGetVariableAction(code: number, value: string) {
    this.symbolVariableCode = code;
    let operatorVariable = {
      typeCode: code,
      typeValue: value,
      label: null
    }
    // @ts-ignore
    this.inputForm.setControl("operatorVariable", new FormControl(operatorVariable));
  }

  onSelectModality() {

    if (this.inputForm.value.modality && this.inputForm.value.modality == 2) {

      let operatorParameter = {
        typeCode: 7,
        typeValue: '+',
        label: null
      }

      if (this.outputData && this.outputData.operatorParameter) {
        operatorParameter = this.outputData.operatorParameter
      }

      // @ts-ignore
      this.inputForm.setControl("operatorParameter", new FormControl(operatorParameter));
    }

    if (this.inputForm.value.modality && this.inputForm.value.modality == 3) {

      let operatorParameter = {
        typeCode: 7,
        typeValue: '+',
        label: null
      }

      if (this.outputData && this.outputData.operatorParameter) {
        operatorParameter = this.outputData.operatorParameter
      }

      // @ts-ignore
      this.inputForm.setControl("operatorParameter", new FormControl(operatorParameter));

      let operatorVariable = {
        typeCode: 7,
        typeValue: '+',
        label: null
      }

      if (this.outputData && this.outputData.operatorVariable) {
        operatorVariable = this.outputData.operatorVariable
      }

      // @ts-ignore
      this.inputForm.setControl("operatorVariable", new FormControl(operatorVariable));
    }

  }
}
