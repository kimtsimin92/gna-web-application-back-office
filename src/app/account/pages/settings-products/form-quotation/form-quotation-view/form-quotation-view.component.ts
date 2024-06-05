import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {SimulationService} from "../../../../simulation/simulation.service";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {SimulationCheckboxComponent} from "../../../../simulation/simulation-checkbox/simulation-checkbox.component";
import {SimulationDateComponent} from "../../../../simulation/simulation-date/simulation-date.component";
import {SimulationEmailComponent} from "../../../../simulation/simulation-email/simulation-email.component";
import {SimulationNumberComponent} from "../../../../simulation/simulation-number/simulation-number.component";
import {SimulationRadioComponent} from "../../../../simulation/simulation-radio/simulation-radio.component";
import {SimulationSelectComponent} from "../../../../simulation/simulation-select/simulation-select.component";
import {SimulationTelComponent} from "../../../../simulation/simulation-tel/simulation-tel.component";
import {SimulationTextComponent} from "../../../../simulation/simulation-text/simulation-text.component";
import {SimulationTextareaComponent} from "../../../../simulation/simulation-textarea/simulation-textarea.component";

@Component({
  selector: 'app-form-quotation-view',
  standalone: true,
  imports: [
    InputTextModule,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    SimulationCheckboxComponent,
    SimulationDateComponent,
    SimulationEmailComponent,
    SimulationNumberComponent,
    SimulationRadioComponent,
    SimulationSelectComponent,
    SimulationTelComponent,
    SimulationTextComponent,
    SimulationTextareaComponent
  ],
  templateUrl: './form-quotation-view.component.html',
  styleUrl: './form-quotation-view.component.css'
})
export class FormQuotationViewComponent implements OnInit, AfterViewInit, OnDestroy {

  headerTitle: string | undefined;

  quotationForm: any = null;
  quotationFormSteps: any[] = [];

  currentStep: any = null;
  currentStepIndex: number = 0;
  currentStepQuestion: any = null;
  currentStepQuestionIndex: number = 0;
  loadingPage: boolean = false;

  isSave: boolean = false;

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

      this.headerTitle = "Configuration des produits";
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
        if (this.currentStepQuestion.field.code == 6) {
          this.currentStepQuestion.field.code = 5;
        }
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

  onViewEdit() {

    this.loadingPage = true;

    // @ts-ignore
    localStorage.setItem("FORM_QUOTATION_DATA", JSON.stringify(this.quotationForm));

    this._router.navigateByUrl("/account/management/products/quotes/forms/edit")
      .then(() => {
        this.loadingPage = false;
      });

  }

}
