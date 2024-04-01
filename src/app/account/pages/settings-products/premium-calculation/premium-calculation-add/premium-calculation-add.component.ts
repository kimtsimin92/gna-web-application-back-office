import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuotationForm} from "../../../../../account/pages/settings-products/form-quotation/quotation-form";
import {StepForm} from "../../../../../account/pages/settings-products/form-quotation/step-form";
import {StepDto} from "../../../../../account/pages/settings-products/form-quotation/step-dto";
import {StepQuestionForm} from "../../../../../account/pages/settings-products/form-quotation/step-question-form";
import {StepQuestionDto} from "../../../../../account/pages/settings-products/form-quotation/step-question-dto";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../../account/account.service";
import {NotBlankDialogComponent} from "../../../../../account/dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  ConfirmationAddDialogComponent
} from "../../../../../account/dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../../account/dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../../account/dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../../account/dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {
  FormBuilderInputTextDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-text-dialog/form-builder-input-text-dialog.component";
import {
  FormBuilderInputNumberDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-number-dialog/form-builder-input-number-dialog.component";
import {
  FormBuilderInputDateDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-date-dialog/form-builder-input-date-dialog.component";
import {
  FormBuilderInputCheckboxDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-checkbox-dialog/form-builder-input-checkbox-dialog.component";
import {
  FormBuilderInputRadioDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-radio-dialog/form-builder-input-radio-dialog.component";
import {
  FormBuilderInputSelectDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-select-dialog/form-builder-input-select-dialog.component";
import {
  FormBuilderInputTextareaDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-textarea-dialog/form-builder-input-textarea-dialog.component";
import {
  FormBuilderInputEmailDialogComponent
} from "../../../../../account/form-builders/form-builder-input/form-builder-input-email-dialog/form-builder-input-email-dialog.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {
  PremiumCalculationForm
} from "../../../../../account/pages/settings-products/premium-calculation/forms/premium-calculation-form";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {
  PremiumCalculationModalityDialogComponent
} from "../premium-calculation-modality-dialog/premium-calculation-modality-dialog.component";

class QuotationFormData {
  name: string | undefined;
  description: string | undefined;
  productGroupId: number | undefined;
  steps: QuotationStepItem[] = [];
}

class QuotationStepItem {
  name: any;
  description: any;
  illustration: any;
  questions: QuotationStepQuestionItem[] = [];
}

class QuotationStepQuestionItem {
  name: any;
  field: any;
}

@Component({
  selector: 'app-premium-calculation-add',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    SharedModule,
    MatOption,
    MatProgressBar,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatTooltip,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon
  ],
  templateUrl: './premium-calculation-add.component.html',
  styleUrl: './premium-calculation-add.component.css'
})
export class PremiumCalculationAddComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  isSave: boolean = false;
  isDisable: boolean = true;
  isReadonly: boolean = true;

  appFormBuilder: any[] = [
    {
      code: 1,
      name: "Texte",
      tag: "input",
      type: "text"
    },
    {
      code: 2,
      name: "Numérique",
      tag: "input",
      type: "number"
    },
    {
      code: 3,
      name: "Date",
      tag: "input",
      type: "date"
    },
    {
      code: 4,
      name: "Case à Cocher",
      tag: "input",
      type: "checkbox"
    },
    {
      code: 5,
      name: "Bouton Radio",
      tag: "input",
      type: "radio"
    },
    {
      code: 6,
      name: "Liste Déroulante",
      tag: "select"
    },
    {
      code: 7,
      name: "Zone de Texte",
      tag: "textarea"
    },
    {
      code: 8,
      name: "Email",
      tag: "input",
      type: "email"
    },
    {
      code: 9,
      name: "Téléphone",
      tag: "input",
      type: "tel"
    },
  ];

  fieldsets: any[] = [];

  questionFieldsets: any[] = [];

  productGroupList: any[] = [];
  productImageUrl: any = null;

  //
  formQuotation: FormGroup = new FormGroup({}, undefined, undefined);
  quotationForm: PremiumCalculationForm = new PremiumCalculationForm();

  formStepList: FormGroup[] = [];
  formStep: FormGroup = new FormGroup({}, undefined, undefined);
  stepForm: StepForm = new StepForm();
  stepDto: StepDto = new StepDto();
  stepDtoList: any[] = [];
  getFormStep: any = null;

  formStepQuestionList: FormGroup[] = [];
  formStepQuestion: FormGroup = new FormGroup({}, undefined, undefined);
  stepQuestionForm: StepQuestionForm = new StepQuestionForm();
  stepQuestionDto: StepQuestionDto = new StepQuestionDto();
  stepQuestionDtoList: any[] = [];
  getFormStepQuestion: any = null;

  currentSelectedTag: any = null;

  quotationFormData: QuotationFormData = new QuotationFormData();
  loadingPage: boolean = false;

  viewDialog: any = null;

  guaranteesByProductGroup: any[] = [];

  loadingData: boolean = false;

  currentSelectData: any = null;

  //

  pricingFormList: any[] = [];
  pricingModalities: any[] = [
    {
      id: 1,
      name: "Valeur fixe"
    },
    {
      id: 2,
      name: "Paramètre x Variable"
    },
    {
      id: 3,
      name: "Valeur fixe x Paramètre x Variable"
    }
  ];

  variableList: any[] = [];

  operatorList: any[] = [];
  operatorListTwo: any[] = [];

  pricingForm: FormGroup = new FormGroup({
    variableOne: new FormControl(null, [Validators.required]),
    operatorOne: new FormControl(null, [Validators.required]),
    valueOne: new FormControl(null, [Validators.required]),
    operatorLogic: new FormControl(null),
    variableTwo: new FormControl(null),
    operatorTwo: new FormControl(null),
    valueTwo: new FormControl(null),
    result: new FormControl(null, [Validators.required]),
    output: new FormControl(null, [Validators.required]),
    modeOutputLabel: new FormControl("Alors"),
    operatorList: new FormControl([]),
    operatorListTwo: new FormControl([])
  });

  modeValue: number = 1;
  modeOutput: number = 1;
  modeOutputLabel: string = "Alors";

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }

    if (localStorage.getItem("PRICING_DATA")) {
      localStorage.removeItem("PRICING_DATA");
    }

    this.headerTitle = "Configuration Produit";
    localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

    this.onGetProductGroupList();

    this.pricingFormList.push(this.pricingForm);

    this.formQuotation = this._fb.group(this.quotationForm);

    this.formStepQuestion = this._fb.group(this.stepQuestionForm);
    this.formStepQuestionList.push(this.formStepQuestion);

    this.stepForm.questions.push(this.formStepQuestionList);
    this.formStep = this._fb.group(this.stepForm);
    this.formStepList.push(this.formStep);


  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onBack() {
    this._router.navigateByUrl("/account/settings-products/premium-calculation/list");
  }

  closeDialog() {
    this._dialog.closeAll();
  }


  onGetNotBlankAlert() {
    // Trigger validation by marking all controls as touched
    this.formStep.markAllAsTouched();
    const dialogRef = this._dialog.open(NotBlankDialogComponent, {
      width: '400px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  onConfirm() {

    this.isSave = true;
    this.accountService.isSave = this.isSave;

    const dialogRef = this._dialog.open(ConfirmationAddDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '340px',
      data: {
        dialogMessage: "de cette prime de calcul"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.onSave();
      } else {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onSaveLoadingDialog(): void {

    const dialogRef = this._dialog.open(SaveLoadingDialogComponent, {
      hasBackdrop: false,
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onSave() {

    this.isSave = true;

    this.onSaveLoadingDialog();

    console.log("PREMIUM CALCULATION DATA");

    let requestData = {
      productGroupId: null,
      guaranteeId: null,
      quotationFormId: null,
      name: null,
      description: null,
      clauses: null
    };

    let clauses: any[] = [];

    console.log(this.formQuotation);

    console.log(this.pricingFormList);

    if (this.formQuotation.value.productGroup) {

      requestData.productGroupId = this.formQuotation.value.productGroup.id;

      if (this.formQuotation.value.guarantee) {
        requestData.guaranteeId = this.formQuotation.value.guarantee.guaranteeId;

        if (this.formQuotation.value.quotationForm) {
          requestData.quotationFormId = this.formQuotation.value.quotationForm;
        }

        if (this.formQuotation.value.name) {
          requestData.name = this.formQuotation.value.name;
        }

        if (this.formQuotation.value.description) {
          requestData.description = this.formQuotation.value.description;
        }

        if (this.pricingFormList && this.pricingFormList.length > 0) {

          this.pricingFormList.forEach((pf: any) => {

            let variableOne = null;
            let variableTwo = null;

            let operatorOne = null;
            let operatorTwo = null;

            let valueOne = null;
            let valueTwo = null;

            if (pf.value.variableOne) {
              variableOne = pf.value.variableOne;
            }

            if (pf.value.operatorOne) {
              operatorOne = pf.value.operatorOne;
            }

            if (pf.value.valueOne) {
              valueOne = pf.value.valueOne;
            }

            if (pf.value.variableTwo) {
              variableTwo = pf.value.variableTwo;
            }

            if (pf.value.operatorTwo) {
              operatorTwo = pf.value.operatorTwo;
            }

            if (pf.value.valueTwo) {
              valueTwo = pf.value.valueTwo;
            }

            let operatorLogic = pf.value.operatorLogic;

            if (operatorLogic) {

              let clause: any = {
                variableOne: variableOne,
                operatorOne: operatorOne,
                valueOne: valueOne,
                operatorLogic: operatorLogic,
                variableTwo: variableTwo,
                operatorTwo: operatorTwo,
                valueTwo: valueTwo,
                output: null,
                result: null
              };

              let output = null;
              let result = null;

              if (pf.value.output) {
                output = pf.value.output;
              }

              if (pf.value.result) {
                result = pf.value.result;
              }

              clause.output = output;
              clause.result = result;

              // @ts-ignore
              clauses.push(clause);

            } else {

              let clause: any = {
                variableOne: variableOne,
                operatorOne: operatorOne,
                valueOne: valueOne,
                output: null,
                result: null
              };

              let output = null;
              let result = null;

              if (pf.value.output) {
                output = pf.value.output;
              }


              if (pf.value.result) {
                result = pf.value.result;
              }

              clause.output = output;
              clause.result = result;

              // @ts-ignore
              clauses.push(clause);

            }

            // @ts-ignore
            requestData.clauses = JSON.stringify(clauses);
          });
        }

      }

    }

    console.log(requestData);

    if (this.pricingFormList && this.pricingFormList.length > 0) {

      this.accountService.addPricing(requestData)
        .subscribe((responseData: HttpResponse<any>) => {
          console.log(responseData);
          this.isSave = false;
          this.accountService.isSave = this.isSave;
          this.closeDialog();
          this.onSaveNotificationDialog();
        }, (errorData: HttpErrorResponse) => {
          this.isSave = false;
          this.accountService.isSave = this.isSave;
          console.log(errorData);
          this.closeDialog();
          this.onSaveErrorNotificationDialog(errorData);
        });
    } else {
      this.isSave = false;
      this.accountService.isSave = this.isSave;
      this.closeDialog();
      this.onGetNotBlankAlert();
    }

  }

  onSaveErrorNotificationDialog(error: HttpErrorResponse): void {

    const dialogRef = this._dialog.open(SaveErrorNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '350px',
      data: {
        httpError: error,
        dialogMessage: "L'enregistrement de ce formulaire a échoué."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

    });

  }

  onSaveNotificationDialog(): void {

    const dialogRef = this._dialog.open(SaveNotificationDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '350px',
      data: {
        dialogMessage: "L'enregistrement de cette prime de calcul a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings-products/premium-calculation/list")
        .then(() => {
          this.loadingPage = false;
        });

    });

  }

  /*  onGetFormItem(tag: string) {

      switch (tag) {

        case "fieldset":
          this.onGetFieldset();
          break;
        default:
          this.onGetFieldset();

      }

    }*/

  onGetFormItem() {
    this.onGetFieldset();
  }

  onGetFormQuestionItem() {
    this.onGetQuestionFieldset();
  }

  onGetQuestionFieldset() {

    let id = this.questionFieldsets.length + 1;

    let fieldset = {
      id: id,
      legend: "Question " + id
    };

    this.questionFieldsets.push(fieldset);

  }

  onGetFieldset() {

    let id = this.fieldsets.length + 1;

    let fieldset = {
      id: id,
      legend: "Etape " + id
    };

    this.fieldsets.push(fieldset);

  }

  onGetStepperState(stepper: MatStepper) {
    console.log(stepper.selectedIndex);
    console.log(stepper);
  }

  onGetProductGroupList() {
    this.loadingData = true;
    this.accountService.pageLoading = true;
    this.accountService.getProductGroupsGuarantees()
      .subscribe((responseData: HttpResponse<any>) => {
        this.loadingData = false;
        this.accountService.pageLoading = false;
        this.productGroupList = responseData["body"];
        console.log(responseData);
      }, (errorData: HttpErrorResponse) => {
        this.loadingData = false;
        this.accountService.pageLoading = false;
        console.log(errorData);
      });
  }

  onAddFormStep() {

    const lastItem = this.pricingFormList[this.pricingFormList.length - 1];

    console.log(lastItem);

    if (lastItem.valid) {

      let pricingForm: FormGroup = new FormGroup({
        variableOne: new FormControl(null, [Validators.required]),
        operatorOne: new FormControl(null, [Validators.required]),
        valueOne: new FormControl(null, [Validators.required]),
        operatorLogic: new FormControl(null),
        variableTwo: new FormControl(null),
        operatorTwo: new FormControl(null),
        valueTwo: new FormControl(null),
        result: new FormControl(null, [Validators.required]),
        output: new FormControl(null, [Validators.required]),
        modeOutputLabel: new FormControl("Alors"),
        operatorList: new FormControl([]),
        operatorListTwo: new FormControl([])
      });

      this.pricingFormList.push(pricingForm);

      console.log(this.pricingFormList);

    } else {
      console.log("Not valid.")
    }

  }

  onAddFormStepQuestion(formStep: FormGroup) {

    let formStepQuestion = this._fb.group(new StepQuestionForm());

    if (!formStep.value.questions) {

      formStep.value.questions = [];
      formStep.value.questions.push(formStepQuestion);

    } else {

      const lastItem = formStep.value.questions[formStep.value.questions.length - 1];

      if (lastItem) {
        if (lastItem.valid) {

          formStep.value.questions.push(formStepQuestion);
        } else {
          console.log("Not valid.")
        }
      } else {
        formStep.value.questions = [];
        formStep.value.questions.push(formStepQuestion);
      }

    }


  }

  onOpenSettingsField(formStepQuestion: FormGroup) {

    this.viewDialog = null;
    let code: any = null;

    if (formStepQuestion.value.currentSelectedTag && formStepQuestion.value.currentSelectedTag.fieldTag) {

      code = formStepQuestion.value.currentSelectedTag.fieldTag.code;

      switch (formStepQuestion.value.currentSelectedTag.fieldTag.code) {
        case 1:
          this.viewDialog = FormBuilderInputTextDialogComponent;
          break;
        case 2:
          this.viewDialog = FormBuilderInputNumberDialogComponent;
          break;
        case 3:
          this.viewDialog = FormBuilderInputDateDialogComponent;
          break;
        case 4:
          this.viewDialog = FormBuilderInputCheckboxDialogComponent;
          break;
        case 5:
          this.viewDialog = FormBuilderInputRadioDialogComponent;
          break;
        case 6:
          this.viewDialog = FormBuilderInputSelectDialogComponent;
          break;
        case 7:
          this.viewDialog = FormBuilderInputTextareaDialogComponent;
          break;
        case 8:
          this.viewDialog = FormBuilderInputEmailDialogComponent
          break;
        default:
          this.viewDialog = null;
      }

    }

    if (this.viewDialog) {

      // @ts-ignore
      const dialogRef = this._dialog.open(this.viewDialog, {
        hasBackdrop: false,
        width: '300px',
        height: '450px',
        data: {
          formStepQuestion: formStepQuestion,
          currentSelectedTag: formStepQuestion.value.currentSelectedTag
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if (result) {

          let attributes: any = null;

          if (code) {

            if (code > 3 && code < 7) {

              if (code !== 5) {
                attributes = {
                  label: result.value.label,
                  options: [],
                  values: [],
                  multiple: result.value.multiple,
                  required: result.value.required,
                }
              } else {
                attributes = {
                  label: result.value.label,
                  options: [],
                  values: [],
                  required: result.value.required,
                }
              }


              if (result.value.options && result.value.values) {

                let optionElements = result.value.options.split("\n");
                let valueElements = result.value.values.split("\n");

                if (optionElements && optionElements.length > 0 && valueElements && valueElements.length > 0) {
                  optionElements.forEach((oe: any) => {
                    attributes.options.push(oe);
                  });
                  valueElements.forEach((ve: any) => {
                    attributes.values.push(ve);
                  });
                }
              }


            } else {
              attributes = result.value;
            }

          }

          formStepQuestion.patchValue({attributes: attributes})
        }
      });

    }

  }

  onGetFieldTag(formStepQuestion: FormGroup, tag: any, q: MatStep, s: MatStep, stepIndex: number, stepQuestionIndex: number, formStep: FormGroup) {

    console.log("TAG");
    console.log(tag);
    console.log("Q");
    console.log(q);
    console.log("S");
    console.log(s);

    let currentSelectedTag = {
      stepIndex: stepIndex + 1,
      stepLabel: s.label,
      questionIndex: stepQuestionIndex + 1,
      questionLabel: q.label,
      fieldTag: tag
    };

    let attributes = {
      name: "step" + currentSelectedTag.stepIndex + "_field" + currentSelectedTag.questionIndex
    };

    console.log(currentSelectedTag);

    formStep.patchValue({position: currentSelectedTag.stepIndex});
    formStepQuestion.patchValue({position: currentSelectedTag.questionIndex});
    formStepQuestion.patchValue({attributes: attributes});
    formStepQuestion.patchValue({currentSelectedTag: currentSelectedTag});

    if (formStepQuestion.value.currentSelectedTag && formStepQuestion.value.currentSelectedTag.fieldTag) {

      switch (formStepQuestion.value.currentSelectedTag.fieldTag.code) {
        case 1:
          this.viewDialog = FormBuilderInputTextDialogComponent;
          break;
        case 2:
          this.viewDialog = FormBuilderInputNumberDialogComponent;
          break;
        case 3:
          this.viewDialog = FormBuilderInputDateDialogComponent;
          break;
        case 4:
          this.viewDialog = FormBuilderInputCheckboxDialogComponent;
          break;
        case 5:
          this.viewDialog = FormBuilderInputRadioDialogComponent;
          break;
        case 6:
          this.viewDialog = FormBuilderInputSelectDialogComponent;
          break;
        case 7:
          this.viewDialog = FormBuilderInputTextareaDialogComponent;
          break;
        case 8:
          this.viewDialog = FormBuilderInputEmailDialogComponent
          break;
        default:
          this.viewDialog = null;
      }

    }

  }

  onRemoveStep(formStep: FormGroup) {

    if (this.pricingFormList && this.pricingFormList.length > 0) {

      let i = this.pricingFormList.lastIndexOf(formStep);
      let s = i;
      let e = i - 1;

      if (e < 1) {
        e = 1
      }

      this.pricingFormList.splice(s, e);

    }

  }

  onRemoveStepQuestion(formStep: FormGroup, f: any) {

    if (formStep.value.questions && formStep.value.questions.length > 0) {

      let i = formStep.value.questions.lastIndexOf(f);
      let s = i;
      let e = i - 1;

      if (e < 1) {
        e = 1
      }

      formStep.value.questions.splice(s, e);

    }

  }

  onGetGuaranteeByProductGroup(pg: any) {

    this.currentSelectData = null;
    this.variableList = [];

    if (pg && pg.guarantees && pg.guarantees.length > 0) {

      this.currentSelectData = pg;
      this.onGetVariable();
      this.guaranteesByProductGroup = [];

      pg.guarantees.forEach((item: any) => {
        this.guaranteesByProductGroup.push(item);
      });

    }

  }

  onGetVariable() {

    console.log(this.currentSelectData);

    this.variableList = [];

    if (this.currentSelectData.quotationForm) {

      this.formQuotation.patchValue({"quotationForm": this.currentSelectData.quotationForm.id})

      if (this.currentSelectData.quotationForm.steps && this.currentSelectData.quotationForm.steps.length > 0) {

        // @ts-ignore
        this.currentSelectData.quotationForm.steps.forEach((step: any) => {

          if (step.questions && step.questions.length > 0) {

            step.questions.forEach((question: any) => {

              console.log(JSON.parse((question.field)));

              let field = JSON.parse(question.field);

              if (field && field.tag) {

                let name = null;
                let label = null;

                if (field.attributes.name) {
                  name = field.attributes.name;
                }

                if (field.attributes.label) {
                  label = field.attributes.label;
                } else if (name) {
                  label = name;
                }

                let variable = {
                  step: step.position,
                  field: question.position,
                  typeCode: field.code,
                  typeValue: field.type,
                  name: name,
                  label: label
                }

                this.variableList.push(variable);

              }

            });

          }

        });

      }

    }

  }


  onGetModeOutput(pf: FormGroup, mode: number) {
    if (mode == 2) {
      pf.patchValue({modeOutputLabel: "et"});
      let operatorLogic = {
        typeCode: 9,
        typeValue: "&&",
        label: "et"
      }
      pf.patchValue({operatorLogic: operatorLogic});
    } else {
      pf.patchValue({modeOutputLabel: "Alors"});
      pf.patchValue({operatorLogic: null});
    }
  }

  onGetVariableType(pf: FormGroup, variable: any) {

    console.log(variable);

    let operatorList = [];

    if (variable.typeCode) {

      switch (variable.typeCode) {
        case 2:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
            {
              typeCode: 3,
              typeValue: ">",
              label: "supérieur à"
            },
            {
              typeCode: 4,
              typeValue: ">=",
              label: "supérieur ou égal à"
            },
            {
              typeCode: 5,
              typeValue: "<",
              label: "inférieur à"
            },
            {
              typeCode: 6,
              typeValue: "<=",
              label: "inférieur ou égal à"
            }
          ];
          pf.patchValue({"operatorList": operatorList});
          break;
        case 3:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
            {
              typeCode: 3,
              typeValue: ">",
              label: "supérieur à"
            },
            {
              typeCode: 4,
              typeValue: ">=",
              label: "supérieur ou égal à"
            },
            {
              typeCode: 5,
              typeValue: "<",
              label: "inférieur à"
            },
            {
              typeCode: 6,
              typeValue: "<=",
              label: "inférieur ou égal à"
            }
          ];
          pf.patchValue({"operatorList": operatorList});
          break;
        default:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
          ];
          pf.patchValue({"operatorList": operatorList});
          break

      }

    } else {
      operatorList = [
        {
          typeCode: 1,
          typeValue: "==",
          label: "égal"
        },
        {
          typeCode: 2,
          typeValue: "!=",
          label: "non égal"
        },
      ];
      pf.patchValue({"operatorList": operatorList});
    }

  }

  onGetVariableTypeTwo(pf: FormGroup, variable: any) {

    console.log(variable);

    let operatorList = [];

    if (variable.typeCode) {

      switch (variable.typeCode) {
        case 2:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
            {
              typeCode: 3,
              typeValue: ">",
              label: "supérieur à"
            },
            {
              typeCode: 4,
              typeValue: ">=",
              label: "supérieur ou égal à"
            },
            {
              typeCode: 5,
              typeValue: "<",
              label: "inférieur à"
            },
            {
              typeCode: 6,
              typeValue: "<=",
              label: "inférieur ou égal à"
            }
          ];
          pf.patchValue({"operatorListTwo": operatorList});
          break;
        case 3:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
            {
              typeCode: 3,
              typeValue: ">",
              label: "supérieur à"
            },
            {
              typeCode: 4,
              typeValue: ">=",
              label: "supérieur ou égal à"
            },
            {
              typeCode: 5,
              typeValue: "<",
              label: "inférieur à"
            },
            {
              typeCode: 6,
              typeValue: "<=",
              label: "inférieur ou égal à"
            }
          ];
          pf.patchValue({"operatorListTwo": operatorList});
          break;
        default:
          operatorList = [
            {
              typeCode: 1,
              typeValue: "==",
              label: "égal"
            },
            {
              typeCode: 2,
              typeValue: "!=",
              label: "non égal"
            },
          ];
          pf.patchValue({"operatorListTwo": operatorList});
          break

      }

    } else {
      operatorList = [
        {
          typeCode: 1,
          typeValue: "==",
          label: "égal"
        },
        {
          typeCode: 2,
          typeValue: "!=",
          label: "non égal"
        },
      ];
      pf.patchValue({"operatorListTwo": operatorList});
    }

  }

  onGetModalitySetting(pf: FormGroup) {

    // @ts-ignore
    const dialogRef = this._dialog.open(PremiumCalculationModalityDialogComponent, {
      hasBackdrop: false,
      width: '300px',
      height: '460px',
      data: {
        outputData: pf.value.output,
        variableList: this.variableList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {

        if (result.value && result.value.modality) {

          let output = {
            modality: null,
            amount: null,
            operatorParameter: null,
            parameter: null,
            operatorVariable: null,
            variable: null
          }

          if (result.value.modality == 1) {
            output.modality = result.value.modality;
            // @ts-ignore
        //    pf.patchValue({"modality": result.value.modality});
            output.amount = result.value.amount;
            // @ts-ignore
            pf.patchValue({"result": output.amount});
            // @ts-ignore
            pf.patchValue({"output": output});
          } else if (result.value.modality == 2) {
            output.modality = result.value.modality;
            // @ts-ignore
          //  pf.patchValue({"modality": result.value.modality});
            output.amount = result.value.amount;
            // @ts-ignore
            pf.patchValue({"amount": result.value.amount});
            output.operatorParameter = result.value.operatorParameter;
            // @ts-ignore
            pf.patchValue({"operatorParameter": result.value.operatorParameter});
            output.parameter = result.value.parameter;
            // @ts-ignore
            pf.patchValue({"parameter": result.value.parameter});
            // @ts-ignore
            let resultData = output.amount + ' ' + output.operatorParameter.typeValue + ' ' + output.parameter;
            // @ts-ignore
            pf.patchValue({"result": resultData});
            // @ts-ignore
            pf.patchValue({"output": output});
          } else if (result.value.modality == 3) {
            output.modality = result.value.modality;
            // @ts-ignore
           // pf.patchValue({"modality": result.value.modality});
            output.amount = result.value.amount;
            // @ts-ignore
            pf.patchValue({"amount": result.value.amount});
            output.operatorParameter = result.value.operatorParameter;
            // @ts-ignore
            pf.patchValue({"operatorParameter": result.value.operatorParameter});
            output.parameter = result.value.parameter;
            // @ts-ignore
            pf.patchValue({"parameter": result.value.parameter});
            output.operatorVariable = result.value.operatorVariable;
            // @ts-ignore
            pf.patchValue({"operatorVariable": result.value.operatorVariable});
            output.variable = result.value.variable;
            // @ts-ignore
            pf.patchValue({"variable": result.value.variable});
            // @ts-ignore
            let resultData = output.amount + ' ' + output.operatorParameter.typeValue + ' ' + output.parameter + ' ' + output.operatorVariable.typeValue + ' ' + output.variable.label;
            // @ts-ignore
            pf.patchValue({"result": resultData});
            // @ts-ignore
            pf.patchValue({"output": output});
          }

          console.log(output);

        }

      }
    });

  }

}
