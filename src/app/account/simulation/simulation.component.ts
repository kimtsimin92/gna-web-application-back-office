import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {SimulationRadioComponent} from "./simulation-radio/simulation-radio.component";
import {SimulationTextComponent} from "./simulation-text/simulation-text.component";
import {NgIf} from "@angular/common";
import {SimulationNumberComponent} from "./simulation-number/simulation-number.component";
import {SimulationDateComponent} from "./simulation-date/simulation-date.component";
import {SimulationCheckboxComponent} from "./simulation-checkbox/simulation-checkbox.component";
import {SimulationSelectComponent} from "./simulation-select/simulation-select.component";
import {SimulationTextareaComponent} from "./simulation-textarea/simulation-textarea.component";
import {SimulationEmailComponent} from "./simulation-email/simulation-email.component";
import {SimulationTelComponent} from "./simulation-tel/simulation-tel.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [
    MatButton,
    SimulationRadioComponent,
    SimulationTextComponent,
    NgIf,
    SimulationNumberComponent,
    SimulationDateComponent,
    SimulationCheckboxComponent,
    SimulationSelectComponent,
    SimulationTextareaComponent,
    SimulationEmailComponent,
    SimulationTelComponent
  ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements OnInit, AfterViewInit, OnDestroy {

  quotationForm: any = null;
  quotationFormSteps: any[] = [];

  currentStep: any = null;
  currentStepIndex: number = 0;
  currentStepQuestion: any = null;
  currentStepQuestionIndex: number = 0;
  loadingPage: boolean = false;

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("FORM_QUOTATION_DATA")) {

      // @ts-ignore
      this.quotationForm = JSON.parse(localStorage.getItem("FORM_QUOTATION_DATA"));
      console.log(this.quotationForm);

      if (this.quotationForm && this.quotationForm.steps && this.quotationForm.steps.length > 0) {
        this.quotationFormSteps = this.quotationForm.steps;
        if (this.quotationFormSteps && this.quotationFormSteps.length > 0) {
           this.onGetCurrentElements();
        }
      }
    }

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onGetCurrentElements() {
    this.currentStep = this.quotationFormSteps[this.currentStepIndex];
    if (this.currentStep && this.currentStep.questions) {
      if (this.currentStep.questions.length > 0) {
        this.currentStepQuestion = this.currentStep.questions[this.currentStepQuestionIndex];
      }
    }
  }

  onGoToNextQ(currentStep: any, currentStepQuestion: any) {
      this.currentStepQuestionIndex++;
      this.currentStepQuestion = currentStep.questions[this.currentStepQuestionIndex];
      console.log(currentStep);
  }

  onGoToNextS(currentStep: any, currentStepQuestion: any) {

    if (this.currentStepIndex == this.quotationFormSteps.length -1) {

      let quotationRequestData = {
        quotationFormId: this.quotationForm.id,
        groupId: this.quotationForm.productGroup.id,
        productId: null,
      }

      this.quotationFormSteps.forEach((qfs: any) => {

        let step = {
          position: qfs.position
        }

      });

      console.log(this.quotationForm);
      console.log("QUOTATION REQUEST DATA");
      console.log(quotationRequestData);

     /* this.loadingPage = true;

      this._router.navigateByUrl("/account/simulation/quotation")
        .then(() => {
          this.loadingPage = false;
        });*/

    } else {
      this.currentStepQuestionIndex = 0;
      this.currentStepIndex++;
      this.currentStep = this.quotationFormSteps[this.currentStepIndex];
      this.onGetCurrentElements();
    }
  }

  onGoToPreviousS(currentStep: any, currentStepQuestion: any) {
    this.currentStepQuestionIndex = currentStep.questions.length;
    this.currentStepIndex--;
    this.currentStep = this.quotationFormSteps[this.currentStepIndex];
    this.onGetCurrentElements();
  }

  onGoToPreviousQ(currentStep: any, currentStepQuestion: any) {
    this.currentStepQuestionIndex--;
    this.currentStepQuestion = currentStep.questions[this.currentStepQuestionIndex];
  }
}
