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

      this.headerTitle = "Simulation Cotation";
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

      this._router.navigateByUrl("/account/settings-products/forms/quotations/list");
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

/*  onGetPricing(simulationRequest: any) {

    let guaranteeList: any[] = [
      {
        id: 6,
        name: "N/A",
        pricingList: [
          {
            "output": {
              "amount": 100000,
              "modality": 1,
              "variable": null,
              "parameter": null,
              "operatorVariable": null,
              "operatorParameter": null
            },
            "result": 100000,
            "valueOne": "Bleu",
            "operatorOne": {
              "label": "égal",
              "typeCode": 1,
              "typeValue": "=="
            },
            "variableOne": {
              "name": "step1_field1",
              "step": 1,
              "field": 1,
              "label": "Couleur",
              "typeCode": 6
            }
          }
        ]
      }
    ];

    if (guaranteeList && guaranteeList.length > 0) {

      guaranteeList.forEach((guarantee: any) => {

        console.log(guarantee);

        if (guarantee.pricingList && guarantee.pricingList.length > 0) {

          guarantee.pricingList.forEach((pricing: any) => {

            if (pricing.output && pricing.output.modality && pricing.output.modality == 1) {

              if (pricing.variableOne) {

                if (simulationRequest && simulationRequest.answers && simulationRequest.answers.length > 0) {

                  simulationRequest.answers.forEach((answer: any) => {

                    if (answer.name == pricing.variableOne.name) {

                      if (pricing.operatorOne && pricing.operatorOne.typeCode) {

                        if (pricing.operatorOne.typeCode == 1) {
                          if (pricing.valueOne == answer.value) {
                            console.log("PRIME GUARANTIE: " + guarantee.id);
                            console.log(pricing.output.amount);
                          }
                        }

                      }

                    }

                  })

                }

              }

            }

          });

        }

      })

    }

  }*/

  onGetQuotation(currentStep: any, currentStepQuestion: any) {

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

            if (question.field.attributes.text) {
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

       this._router.navigateByUrl("/account/simulation/quotation")
         .then(() => {
           localStorage.setItem("SIMULATION_REQUEST_DATA", JSON.stringify(simulationRequest));
           this.loadingPage = false;
         });

/*    this.simulationService.onGetQuotation(simulationRequest)
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });*/

  }

  onBack() {
    this._router.navigateByUrl("/account/settings-products/forms/quotations/list");
  }
}
