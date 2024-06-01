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
import {SimulationService} from "./simulation.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {HeaderComponent} from "../components/header/header.component";
import {AccountService} from "../account.service";
import {MatIcon} from "@angular/material/icon";

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
        SimulationTelComponent,
      MatIcon,
        HeaderComponent
    ],
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.css'
})
export class SimulationComponent implements OnInit, AfterViewInit, OnDestroy {

  headerTitle: string | undefined;

  quotationForm: any = null;
  quotationFormSteps: any[] = [];

  currentStep: any = null;
  currentStepIndex: number = 0;
  currentStepQuestion: any = null;
  currentStepQuestionIndex: number = 0;
  loadingPage: boolean = false;

  constructor(
    private _router: Router,
    public accountService: AccountService,
    private simulationService: SimulationService
  ) {
  }

  ngOnInit(): void {

    if (localStorage.getItem("SIMULATION_REQUEST_DATA")) {
      localStorage.removeItem("SIMULATION_REQUEST_DATA");
    }

    if (localStorage.getItem("FORM_QUOTATION_DATA")) {

      this.headerTitle = "Simulation";
      localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

      // @ts-ignore
      this.quotationForm = JSON.parse(localStorage.getItem("FORM_QUOTATION_DATA"));
      console.log(this.quotationForm);

      if (this.quotationForm && this.quotationForm.steps && this.quotationForm.steps.length > 0) {
        this.quotationFormSteps = this.quotationForm.steps;
        if (this.quotationFormSteps && this.quotationFormSteps.length > 0) {
          this.onGetCurrentElements();
        }
      }
    } else {

      this._router.navigateByUrl("/account/management/products/quotes/forms/list");
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

        if (this.currentStepIndex != 0) {
          if (this.currentStepQuestion.field.code == 6) {
            this.currentStepQuestion.field.code = 5;
          } else if (this.currentStepQuestion.field.code == 5) {
            this.currentStepQuestion.field.code = 6;
          }
        }

        console.log(this.currentStepQuestion);
      }
    }
  }

  onGoToNextQ(currentStep: any, currentStepQuestion: any) {
    console.log("onGoToNextQ");
      setTimeout(() => {
        this.currentStepQuestionIndex++;
        this.currentStepQuestion = currentStep.questions[this.currentStepQuestionIndex];
        if (currentStepQuestion.field.code == 6) {
          this.currentStepQuestion.field.code = 5;
        } else if (currentStepQuestion.field.code == 6) {
          this.currentStepQuestion.field.code = 6;
        }
        console.log(this.currentStepQuestion);
      }, 20);
  }

  onGoToNextS(currentStep: any, currentStepQuestion: any) {
    console.log("onGoToNextS");
    if (this.currentStepIndex == this.quotationFormSteps.length -1) {

      let simulationRequest = {
        quotationFormId: this.quotationForm.id,
        groupId: this.quotationForm.productGroup.id,
        productId: null,
        answers: []
      }

      this.quotationFormSteps.forEach((step: any) => {

        if (step.questions && step.questions.length > 0) {
          step.questions.forEach((question: any) => {
            let answer = {
              step: step.position,
              field: question.position,
              name: question.field.attributes.name,
              value: question.field.attributes.value,
            }

            // @ts-ignore
            simulationRequest.answers.push(answer);
          });
        }


      });

    } else {
      this.currentStepQuestionIndex = 0;
      this.currentStepIndex++;
      this.currentStep = this.quotationFormSteps[this.currentStepIndex];
      this.onGetCurrentElements();
    }
  }

  onGoToPreviousS(currentStep: any, currentStepQuestion: any) {
    console.log("onGoToPreviousS");
    this.currentStepIndex--;
    this.currentStep = this.quotationFormSteps[this.currentStepIndex];
    this.currentStepQuestionIndex = this.currentStep.questions.length -1;
   this.onGetCurrentElements();
  }

  onGoToPreviousQ(currentStep: any, currentStepQuestion: any) {
    console.log("onGoToPreviousQ");
    this.currentStepQuestionIndex--;
    this.currentStepQuestion = currentStep.questions[this.currentStepQuestionIndex];
  }


  onGetQuotation(currentStep: any, currentStepQuestion: any) {

      let simulationRequest = {
        quoteFormId: this.quotationForm.id,
        productGroupId: this.quotationForm.productGroup.id,
        productId: null,
        answers: []
      }

      this.quotationFormSteps.forEach((step: any) => {

        if (step.questions && step.questions.length > 0) {
          step.questions.forEach((question: any) => {
            let answer = {
              step: step.position,
              field: question.position,
              name: question.field.attributes.name,
              value: question.field.attributes.value,
            }

            if (question.field.attributes.numeric) {
              answer.value = Number(question.field.attributes.value);
            }
            // @ts-ignore
            simulationRequest.answers.push(answer);
          });
        }


      });

      console.log(this.quotationForm);
      console.log("SIMULATION REQUEST DATA");
      console.log(simulationRequest);

       this.loadingPage = true;

       this._router.navigateByUrl("/account/simulation/quote")
         .then(() => {
           localStorage.setItem("SIMULATION_REQUEST_DATA", JSON.stringify(simulationRequest));
           this.loadingPage = false;
         });

  }

  onBack() {
    this._router.navigateByUrl("/account/management/products/quotes/forms/list");
  }
}
