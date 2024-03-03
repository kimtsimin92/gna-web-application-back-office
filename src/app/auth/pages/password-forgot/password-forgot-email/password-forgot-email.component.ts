import {Component, Input} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepperNext} from "@angular/material/stepper";

@Component({
  selector: 'app-password-forgot-email',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatStep,
        MatStepLabel,
        MatStepperNext,
        ReactiveFormsModule
    ],
  templateUrl: './password-forgot-email.component.html',
  styleUrl: './password-forgot-email.component.css'
})
export class PasswordForgotEmailComponent {

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

}
