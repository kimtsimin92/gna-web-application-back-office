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
import {PremiumCalculationForm} from "../../../../../@core/forms/premium-calculation-form";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";

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
    MatTooltip
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
  ];

  fieldsets: any[] = [];

  questionFieldsets: any[] = [];

  productGroupList: any[] = [];
  productImageUrl: any = null;

  //
  formQuotation: FormGroup = new FormGroup({}, undefined, undefined);
  quotationForm: QuotationForm = new PremiumCalculationForm();

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

  operatorList: any[] = [
    {
      code: 1,
      symbol: "=",
      name: "égal"
    },
    {
      code: 2,
      symbol: "<>",
      name: "non égal"
    },
    {
      code: 3,
      symbol: ">",
      name: "supérieur à"
    },
    {
      code: 4,
      symbol: ">=",
      name: "supérieur ou égal à"
    },
    {
      code: 5,
      symbol: "<",
      name: "inférieur à"
    },
    {
      code: 6,
      symbol: "<",
      name: "inférieur ou égal à"
    }
  ];

  pricingForm: FormGroup = new FormGroup({
    column: new FormControl(null, [Validators.required]),
    operatorComparison: new FormControl(null, [Validators.required]),
    value: new FormControl(null, [Validators.required]),
    operatorLogic: new FormControl(null, [Validators.required]),
    output: new FormControl(null, [Validators.required]),
  });


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
       // this.onSave();
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

    console.log("QUOTATION FORM DATA");

    this.quotationFormData = new QuotationFormData();

    this.quotationFormData.name = this.formQuotation.value.name;
    this.quotationFormData.description = this.formQuotation.value.description;
    this.quotationFormData.productGroupId = this.formQuotation.value.productGroup.id;

    console.log(this.quotationFormData);
    console.log(this.formStepList);

    if (this.formStepList && this.formStepList.length > 0) {

      this.formStepList.forEach((fs: any) => {

        if (!fs.value.position || !fs.value.name) {
          this.isSave = false;
          this.accountService.isSave = this.isSave;
          this.closeDialog();
          this.onGetNotBlankAlert();
          return;
        } else {

          let step = {
            position: fs.value.position,
            name: fs.value.name,
            description: fs.value.description,
            illustration: fs.value.illustration,
            questions: []
          };

          if (fs.value.questions && fs.value.questions.length > 0) {

            fs.value.questions.forEach((fsq: any) => {

              let position = null;

              let field = {
                code: null,
                name: null,
                tag: null,
                type: null,
                attributes: [],
              };

              let attributes = null;

              if (fsq.value.currentSelectedTag) {
                position = fsq.value.currentSelectedTag.questionIndex;
              }

              if (fsq.value.field) {
                field.code = fsq.value.field.code;
                field.name = fsq.value.field.name;
                field.tag = fsq.value.field.tag;
                field.type = fsq.value.field.type;
              }

              if (fsq.value.attributes) {
                attributes = fsq.value.attributes;
                field.attributes = attributes;
              }

              if (!position || !field || !attributes) {
                this.isSave = false;
                this.accountService.isSave = this.isSave;
                this.closeDialog();
                this.onGetNotBlankAlert();
                step.questions = [];
                return;
              } else {


                let question = {
                  position: position,
                  name: fsq.value.name,
                  fieldData: JSON.stringify(field)
                }

                // @ts-ignore
                step.questions.push(question);

              }

            });

          }

          if (step && step.questions && step.questions.length > 0) {
            this.quotationFormData.steps.push(step);
            console.log(this.quotationFormData);
          }

        }

      });

      if (this.quotationFormData && this.quotationFormData.steps && this.quotationFormData.steps.length > 0) {
        this.accountService.addFormQuotation(this.quotationFormData)
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

    const lastItem = this.formStepList[this.formStepList.length - 1];

    console.log(lastItem);

    if (lastItem.valid) {

      let formStepQuestion = this._fb.group(new StepQuestionForm());
      let formStepQuestionList = [];
      formStepQuestionList.push(formStepQuestion);

      let stepForm = new StepForm();
      stepForm.questions.push(formStepQuestionList)
      let formStep = this._fb.group(stepForm);
      this.formStepList.push(formStep);

      console.log(this.formStepList);

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
      name: "step"+currentSelectedTag.stepIndex+"_field"+currentSelectedTag.questionIndex
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

    if (this.formStepList && this.formStepList.length > 0) {

      let i = this.formStepList.lastIndexOf(formStep);
      let s = i;
      let e = i - 1;

      if (e < 1) {
        e = 1
      }

      this.formStepList.splice(s, e);

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

    if (this.currentSelectData.quotationForm) {

      if (this.currentSelectData.quotationForm.steps && this.currentSelectData.quotationForm.steps.length > 0) {

        // @ts-ignore
        this.currentSelectData.quotationForm.steps.forEach((step: any) => {

          if (step.questions && step.questions.length > 0) {

            let variables: any[] = [];

            step.questions.forEach((question: any) => {

              console.log(JSON.parse((question.field)));

              let variable = {
                position: question.position,
                name: question.name
              }

              this.variableList.push(variable);

            });

          }

        });

      }

    }

  }


}
