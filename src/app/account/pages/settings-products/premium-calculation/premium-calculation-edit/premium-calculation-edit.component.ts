import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {QuotationForm} from "../../form-quotation/quotation-form";
import {PremiumCalculationForm} from "../forms/premium-calculation-form";
import {StepForm} from "../../form-quotation/step-form";
import {StepDto} from "../../form-quotation/step-dto";
import {StepQuestionForm} from "../../form-quotation/step-question-form";
import {StepQuestionDto} from "../../form-quotation/step-question-dto";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  ConfirmationAddDialogComponent
} from "../../../../dialogs/confirmation/confirmation-add-dialog/confirmation-add-dialog.component";
import {
  SaveLoadingDialogComponent
} from "../../../../dialogs/loading/save-loading-dialog/save-loading-dialog.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {
  SaveErrorNotificationDialogComponent
} from "../../../../dialogs/notification/save-error-notification-dialog/save-error-notification-dialog.component";
import {
  SaveNotificationDialogComponent
} from "../../../../dialogs/notification/save-notification-dialog/save-notification-dialog.component";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {
  FormBuilderInputTextDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-text-dialog/form-builder-input-text-dialog.component";
import {
  FormBuilderInputNumberDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-number-dialog/form-builder-input-number-dialog.component";
import {
  FormBuilderInputDateDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-date-dialog/form-builder-input-date-dialog.component";
import {
  FormBuilderInputCheckboxDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-checkbox-dialog/form-builder-input-checkbox-dialog.component";
import {
  FormBuilderInputRadioDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-radio-dialog/form-builder-input-radio-dialog.component";
import {
  FormBuilderInputSelectDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-select-dialog/form-builder-input-select-dialog.component";
import {
  FormBuilderInputTextareaDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-textarea-dialog/form-builder-input-textarea-dialog.component";
import {
  FormBuilderInputEmailDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-email-dialog/form-builder-input-email-dialog.component";
import {
  PremiumCalculationModalityDialogComponent
} from "../premium-calculation-modality-dialog/premium-calculation-modality-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
import {
  EditLoadingDialogComponent
} from "../../../../dialogs/loading/edit-loading-dialog/edit-loading-dialog.component";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-premium-calculation-edit',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    InputTextModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMenu,
    MatMenuItem,
    MatOption,
    MatProgressBar,
    MatSelect,
    MatTooltip,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    MatMenuTrigger,
    IconFieldModule,
    InputIconModule,
    InputTextareaModule
  ],
  templateUrl: './premium-calculation-edit.component.html',
  styleUrl: './premium-calculation-edit.component.css'
})
export class PremiumCalculationEditComponent implements OnInit, OnDestroy, AfterViewInit {

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
  operatorListThree: any[] = [];


  modeValue: number = 1;
  modeOutput: number = 1;
  modeOutputLabel: string = "Alors";

  pricingFormData: any = null;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("PRICING_DATA")) {


      if (localStorage.getItem("APP_HEADER_TITLE")) {
        localStorage.removeItem("APP_HEADER_TITLE");
      }

      this.headerTitle = "Configuration Produit";
      localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

     // this.onGetProductGroupList();

      // @ts-ignore
      this.pricingFormData = JSON.parse(localStorage.getItem("PRICING_DATA"));

      if (this.pricingFormData) {

        this.quotationForm.quotationForm.setValue(this.pricingFormData.quotationForm.id);
        this.quotationForm.name.setValue(this.pricingFormData.name);
        this.quotationForm.description.setValue(this.pricingFormData.description);

        if (this.pricingFormData.group) {
          this.quotationForm.productGroup.setValue(this.pricingFormData.group.name);
          this.productGroupList.push(this.pricingFormData.group);
          if (this.pricingFormData.guarantee) {
            this.quotationForm.guarantee.setValue(this.pricingFormData.guarantee.guaranteeName);
            this.guaranteesByProductGroup.push(this.pricingFormData.guarantee);
            this.currentSelectData = this.pricingFormData.group;
            this.onGetVariable();
          }
        }

        this.pricingFormData.clauses = JSON.parse(this.pricingFormData.clauses);

        console.log(this.pricingFormData.clauses);

        if (this.pricingFormData.clauses && this.pricingFormData.clauses.length > 0) {

          // @ts-ignore
          this.pricingFormData.clauses.forEach((clause: any) => {

           let pricingForm: FormGroup = new FormGroup({
              vOne: new FormControl(clause.variableOne),
              variableOne: new FormControl(clause.variableOne.name, [Validators.required]),
              operatorOne: new FormControl(clause.operatorOne.typeCode, [Validators.required]),
              valueOne: new FormControl(clause.valueOne, [Validators.required]),
              operatorLogic: new FormControl(clause.operatorLogic),
              vTwo: new FormControl(null),
              variableTwo: new FormControl(null),
              operatorTwo: new FormControl(null),
              valueTwo: new FormControl(clause.valueTwo),
             operatorLogicTwo: new FormControl(clause.operatorLogicTwo),
             vThree: new FormControl(null),
             variableThree: new FormControl(null),
             operatorThree: new FormControl(null),
             valueThree: new FormControl(clause.valueThree),
              result: new FormControl(clause.result, [Validators.required]),
              output: new FormControl(clause.output, [Validators.required]),
              modeOutputLabel: new FormControl("Alors"),
              modeOutputLabelTwo: new FormControl("Alors"),
              operatorList: new FormControl([]),
              operatorListTwo: new FormControl([]),
              operatorListThree: new FormControl([])
            });

            this.onGetVariableType(pricingForm, clause.variableOne);

           if (clause.operatorLogic) {
             pricingForm.patchValue({modeOutputLabel: "et"});

             if (clause.operatorTwo) {
               console.log(clause.operatorTwo)
               pricingForm.patchValue({operatorTwo: clause.operatorTwo.typeCode});
             }

             if (clause.variableTwo) {
               console.log(clause.variableTwo)
               pricingForm.patchValue({vTwo: clause.variableTwo});
               pricingForm.patchValue({variableTwo: clause.variableTwo.name});
               this.onGetVariableTypeTwo(pricingForm, clause.variableTwo);
             }

           }

            if (clause.operatorLogicTwo) {
              pricingForm.patchValue({modeOutputLabelTwo: "et"});

              if (clause.operatorThree) {
                console.log(clause.operatorThree)
                pricingForm.patchValue({operatorThree: clause.operatorThree.typeCode});
              }

              if (clause.variableThree) {
                console.log(clause.variableThree)
                pricingForm.patchValue({vThree: clause.variableThree});
                pricingForm.patchValue({variableThree: clause.variableThree.name});
                this.onGetVariableTypeThree(pricingForm, clause.variableThree);
              }

            }


           this.pricingFormList.push(pricingForm);

          });

        }

        this.formQuotation = this._fb.group(this.quotationForm);

      }


    } else {
      this._router.navigateByUrl("/account/management/products/pricing/edit/list");
    }


  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("APP_HEADER_TITLE")) {
      localStorage.removeItem("APP_HEADER_TITLE");
    }
    if (localStorage.getItem("PRICING_DATA")) {
      localStorage.removeItem("PRICING_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/management/products/pricing/list");
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

    const dialogRef = this._dialog.open(ConfirmationEditDialogComponent, {
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

    const dialogRef = this._dialog.open(EditLoadingDialogComponent, {
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
      id: this.pricingFormData.id,
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

      requestData.productGroupId = this.pricingFormData.group.id;

      if (this.formQuotation.value.guarantee) {
        requestData.guaranteeId = this.pricingFormData.guarantee.guaranteeId;

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
            let variableThree = null;

            let operatorOne = null;
            let operatorTwo = null;
            let operatorThree = null;

            let valueOne = null;
            let valueTwo = null;
            let valueThree = null;

            if (pf.value.variableOne) {

              if (this.variableList && this.variableList.length > 0) {
                this.variableList.forEach((vl: any) => {
                  if (vl.name == pf.value.variableOne)
                  variableOne = vl;
                });
              }

            }

            if (pf.value.operatorOne) {
              if (pf.value.operatorList && pf.value.operatorList.length > 0) {
                pf.value.operatorList.forEach((ol: any) => {
                  if (ol.typeCode == pf.value.operatorOne)
                    operatorOne = ol;
                });
              }
            }

            if (pf.value.valueOne) {
              valueOne = pf.value.valueOne;
            }

            if (pf.value.variableTwo) {
              if (this.variableList && this.variableList.length > 0) {
                this.variableList.forEach((vl: any) => {
                  if (vl.name == pf.value.variableTwo)
                    variableTwo= vl;
                });
              }
            }

            if (pf.value.operatorTwo) {
              if (pf.value.operatorListTwo && pf.value.operatorListTwo.length > 0) {
                pf.value.operatorListTwo.forEach((ol: any) => {
                  if (ol.typeCode == pf.value.operatorTwo)
                    operatorTwo = ol;
                });
              }
            }

            if (pf.value.valueTwo) {
              valueTwo = pf.value.valueTwo;
            }

            //

            if (pf.value.variableThree) {
              if (this.variableList && this.variableList.length > 0) {
                this.variableList.forEach((vl: any) => {
                  if (vl.name == pf.value.variableThree)
                    variableThree = vl;
                });
              }
            }

            if (pf.value.operatorThree) {
              if (pf.value.operatorListThree && pf.value.operatorListThree.length > 0) {
                pf.value.operatorListThree.forEach((ol: any) => {
                  if (ol.typeCode == pf.value.operatorThree)
                    operatorThree = ol;
                });
              }
            }

            if (pf.value.valueThree) {
              valueThree = pf.value.valueThree;
            }

            //

            let operatorLogic = pf.value.operatorLogic;
            let operatorLogicTwo = pf.value.operatorLogicTwo;

            if (operatorLogic && operatorLogicTwo) {

              let clause: any = {
                variableOne: variableOne,
                operatorOne: operatorOne,
                valueOne: valueOne,
                operatorLogic: operatorLogic,
                variableTwo: variableTwo,
                operatorTwo: operatorTwo,
                valueTwo: valueTwo,
                operatorLogicTwo: operatorLogicTwo,
                variableThree: variableThree,
                operatorThree: operatorThree,
                valueThree: valueThree,
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

            } else if (operatorLogic) {

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

      this.accountService.editPricing(requestData.id, requestData)
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
        dialogMessage: "La modification de ce formulaire a échoué."
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
        dialogMessage: "La modification de cette prime de calcul a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/management/products/pricing/list")
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
        vOne: new FormControl(null),
        variableOne: new FormControl(null, [Validators.required]),
        operatorOne: new FormControl(null, [Validators.required]),
        valueOne: new FormControl(null, [Validators.required]),
        operatorLogic: new FormControl(null),
        vTwo: new FormControl(null),
        variableTwo: new FormControl(null),
        operatorTwo: new FormControl(null),
        valueTwo: new FormControl(null),
        operatorLogicTwo: new FormControl(null),
        vThree: new FormControl(null),
        variableThree: new FormControl(null),
        operatorThree: new FormControl(null),
        valueThree: new FormControl(null),
        result: new FormControl(null, [Validators.required]),
        output: new FormControl(null, [Validators.required]),
        modeOutputLabel: new FormControl("Alors"),
        modeOutputLabelTwo: new FormControl("Alors"),
        operatorList: new FormControl([]),
        operatorListTwo: new FormControl([]),
        operatorListThree: new FormControl([])
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
        width: '400px',
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

    if (this.pricingFormData.quotationForm) {

      this.formQuotation.patchValue({"quotationForm": this.pricingFormData.quotationForm.id})

      if (this.pricingFormData.quotationForm.steps && this.pricingFormData.quotationForm.steps.length > 0) {

        // @ts-ignore
        this.pricingFormData.quotationForm.steps.forEach((step: any) => {

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
                  label: label,
                  numeric: field.attributes.numeric
                }

                if (variable.numeric) {
                  variable.typeCode = 2;
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

  onGetModeOutputTwo(pf: FormGroup, mode: number) {
    if (mode == 2) {
      pf.patchValue({modeOutputLabelTwo: "et"});
      let operatorLogicTwo = {
        typeCode: 9,
        typeValue: "&&",
        label: "et"
      }
      pf.patchValue({operatorLogicTwo: operatorLogicTwo});
    } else {
      pf.patchValue({modeOutputLabelTwo: "Alors"});
      pf.patchValue({operatorLogicTwo: null});
    }
  }

  onGetVariableType(pf: FormGroup, variable: any) {

    console.log(variable);

    let operatorList = [];

        pf.patchValue({"vOne": variable});

      console.log(pf);

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

    pf.patchValue({"vTwo": variable});

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

  onGetVariableTypeThree(pf: FormGroup, variable: any) {

    console.log(variable);

    let operatorList = [];

    pf.patchValue({"vThree": variable});

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
          pf.patchValue({"operatorListThree": operatorList});
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
          pf.patchValue({"operatorListThree": operatorList});
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
          pf.patchValue({"operatorListThree": operatorList});
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
      pf.patchValue({"operatorListThree": operatorList});
    }

  }

  onGetModalitySetting(pf: FormGroup) {

    // @ts-ignore
    const dialogRef = this._dialog.open(PremiumCalculationModalityDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '500px',
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
            // @ts-ignore
           pf.patchValue({"modality": result.value.modality});
            output.modality = result.value.modality;
            output.amount = result.value.amount;
            // @ts-ignore
            pf.patchValue({"result": output.amount});
            // @ts-ignore
            pf.patchValue({"output": output});
          } else if (result.value.modality == 2) {
            output.modality = result.value.modality;
            // @ts-ignore
            pf.patchValue({"modality": result.value.modality});
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

            let variable = result.value.variable;

            if (this.variableList && this.variableList.length > 0) {
              this.variableList.forEach((vl: any) => {
                if (vl.name == result.value.variable) {
                  variable = vl;
                }
              });
            }

            output.modality = result.value.modality;
            // @ts-ignore
            pf.patchValue({"modality": result.value.modality});
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
            output.variable = variable;
            // @ts-ignore
            pf.patchValue({"variable": variable});
            // @ts-ignore
            let resultData = '('+output.amount + ' ' + output.operatorParameter.typeValue + ' ' + output.parameter + ') ' + output.operatorVariable.typeValue + ' ' + output.variable.label;
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
