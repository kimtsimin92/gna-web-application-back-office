import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {ImageModule} from "primeng/image";
import {InputTextModule} from "primeng/inputtext";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {QuotationForm} from "../../form-quotation/quotation-form";
import {StepForm} from "../../form-quotation/step-form";
import {StepDto} from "../../form-quotation/step-dto";
import {StepQuestionForm} from "../../form-quotation/step-question-form";
import {StepQuestionDto} from "../../form-quotation/step-question-dto";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {
  ConfirmationEditDialogComponent
} from "../../../../dialogs/confirmation/confirmation-edit-dialog/confirmation-edit-dialog.component";
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
import {SubscriptionForm} from "../../subscription-form";

class QuotationFormData {
  name: string | undefined;
  description: string | undefined;
  formQuotationId: number | undefined;
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
  selector: 'app-form-subscription-edit',
  standalone: true,
    imports: [
        DropdownModule,
        ImageModule,
        InputTextModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatStep,
        MatStepper,
        MatStepperNext,
        MatStepperPrevious,
        MatTooltip,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        SharedModule
    ],
  templateUrl: './form-subscription-edit.component.html',
  styleUrl: './form-subscription-edit.component.css'
})
export class FormSubscriptionEditComponent implements OnInit, OnDestroy, AfterViewInit {

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
    /*    {
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
        },*/
    {
      code: 6,
      name: "Liste Déroulante",
      tag: "select"
    },
    /*{
      code: 7,
      name: "Zone de Texte",
      tag: "textarea"
    },*/
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
    }
  ];

  fieldsets: any[] = [];

  questionFieldsets: any[] = [];

  productGroupList: any[] = [];
  productImageUrl: any = null;

  //
  formQuotation: FormGroup = new FormGroup({}, undefined, undefined);
  quotationForm: SubscriptionForm = new SubscriptionForm();

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
  private loadingPage: boolean = false;

  viewDialog: any = null;

  formQuotationData: any = null;

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialog,
    private _router: Router,
    public accountService: AccountService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("FORM_SUBSCRIPTION_DATA")) {

      if (localStorage.getItem("APP_HEADER_TITLE")) {
        localStorage.removeItem("APP_HEADER_TITLE");
      }

      this.headerTitle = "Configuration Produit";
      localStorage.setItem("APP_HEADER_TITLE", this.headerTitle);

      this.onGetProductGroupList();

      // @ts-ignore
      this.formQuotationData = JSON.parse(localStorage.getItem("FORM_SUBSCRIPTION_DATA"));

      if (this.formQuotationData) {

        this.quotationForm.name.setValue(this.formQuotationData.name);
        this.quotationForm.description.setValue(this.formQuotationData.description);

        if (this.formQuotationData.formQuotation) {
          this.quotationForm.formQuotation.setValue(this.formQuotationData.formQuotation.name);
        }

        if (this.formQuotationData.steps && this.formQuotationData.steps.length > 0) {

          // @ts-ignore
          this.formQuotationData.steps.forEach((step: any) => {

            let s = new StepForm();
            s.position.setValue(step.position);
            s.name.setValue(step.name);
            s.description.setValue(step.description);

            if (step.questions && step.questions.length > 0) {

              let questionList: any[] = [];

              step.questions.forEach((question: any) => {

                let q = new StepQuestionForm();
                q.position.setValue(question.position);
                q.name.setValue(question.name);
                q.field.setValue(question.field.code);

                this.onGetViewInput(question.field.code);

                let fq = this._fb.group(q);
                let currentSelectedTag = {
                  stepIndex: step.position,
                  stepLabel: step.name,
                  questionIndex: question.position,
                  questionLabel: question.name,
                  fieldTag: question.field
                };

                // @ts-ignore
                fq.patchValue({currentSelectedTag: currentSelectedTag});
                if (question.field && question.field.attributes) {
                  fq.patchValue({attributes: question.field.attributes});
                }
                questionList.push(fq);

              });

              s.questions.push(questionList);

            }

            let fs = this._fb.group(s);
            this.formStepList.push(fs);

          });

        } else {

          this.formStepQuestion = this._fb.group(this.stepQuestionForm);
          this.formStepQuestionList.push(this.formStepQuestion);

          this.stepForm.questions.push(this.formStepQuestionList);
          this.formStep = this._fb.group(this.stepForm);
          this.formStepList.push(this.formStep);

        }

        this.formQuotation = this._fb.group(this.quotationForm);

      }

    } else {
      this._router.navigateByUrl("/account/settings-products/forms/subscriptions/list");
    }

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (localStorage.getItem("FORM_SUBSCRIPTION_DATA")) {
      localStorage.removeItem("FORM_SUBSCRIPTION_DATA");
    }
  }

  onBack() {
    this._router.navigateByUrl("/account/settings-products/forms/subscriptions/list");
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
        dialogMessage: "de ce formulaire"
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

    console.log("SUBSCRIPTION FORM DATA");

    this.quotationFormData = new QuotationFormData();

    this.quotationFormData.name = this.formQuotation.value.name;
    this.quotationFormData.description = this.formQuotation.value.description;

    if (this.formQuotation.value.formQuotation) {
      if (this.productGroupList && this.productGroupList.length > 0) {
        this.productGroupList.forEach((g: any) => {
          if (g.name === this.formQuotation.value.formQuotation) {
            this.quotationFormData.formQuotationId = g.id;
          }
        });
      }
    }

    console.log(this.formQuotation);
    console.log(this.quotationFormData);
    console.log(this.formStepList);

    if (this.formStepList && this.formStepList.length > 0) {

      this.formStepList.forEach((fs: any) => {

        if (!fs.value.position || !fs.value.name) {
          this.isSave = false;
          this.accountService.isSave = this.isSave;
          this.closeDialog();
          console.log("Ici...");
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
                if (this.appFormBuilder && this.appFormBuilder.length > 0) {
                  this.appFormBuilder.forEach((f: any) => {
                    if (f.code === fsq.value.field) {
                      field.code = f.code;
                      field.name = f.name;
                      field.tag = f.tag;
                      field.type = f.type;
                    }
                  });
                }
              }

              if (fsq.value.attributes) {
                attributes = fsq.value.attributes;
                field.attributes = attributes;
              }

              if (!position || !field || !attributes) {
                this.isSave = false;
                this.accountService.isSave = this.isSave;
                this.closeDialog();
                console.log("Ici...");
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

        let id = this.formQuotationData.id;
        this.accountService.editFormSubscription(id, this.quotationFormData)
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
        dialogMessage: "La modification de ce formulaire a réussi."
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isSave = false;
        this.accountService.isSave = this.isSave;
      }

      this._router.navigateByUrl("/account/settings-products/forms/subscriptions/list")
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
    this.accountService.pageLoading = true;
    this.accountService.getFormQuotationList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        this.productGroupList = responseData["body"];
        console.log(responseData);
      }, (errorData: HttpErrorResponse) => {
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

    if (formStepQuestion.value.currentSelectedTag && formStepQuestion.value.currentSelectedTag.fieldTag) {

      this.onGetViewInput(formStepQuestion.value.currentSelectedTag.fieldTag.code);

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
          formStepQuestion.patchValue({attributes: result.value})
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

      this.onGetViewInput(formStepQuestion.value.currentSelectedTag.fieldTag.code);

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

  onGetViewInput(code: number) {

    switch (code) {
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
      case 9:
        this.viewDialog = FormBuilderInputTextDialogComponent
        break;
      default:
        this.viewDialog = null;
    }

  }

}
