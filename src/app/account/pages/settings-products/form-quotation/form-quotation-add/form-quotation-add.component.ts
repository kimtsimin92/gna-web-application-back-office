import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {ImageModule} from "primeng/image";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {KeyFilterModule} from "primeng/keyfilter";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MultiSelectModule} from "primeng/multiselect";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account.service";
import {NotBlankDialogComponent} from "../../../../dialogs/not-blank-dialog/not-blank-dialog.component";
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {StepForm} from "../step-form";
import {StepDto} from "../step-dto";
import {StepQuestionForm} from "../step-question-form";
import {StepQuestionDto} from "../step-question-dto";
import {QuotationForm} from "../quotation-form";
import {MatTooltip} from "@angular/material/tooltip";
import {
  FormBuilderInputTextDialogComponent
} from "../../../../form-builders/form-builder-input/form-builder-input-text-dialog/form-builder-input-text-dialog.component";

@Component({
  selector: 'app-form-quotation-add',
  standalone: true,
  imports: [
    CheckboxModule,
    DecimalPipe,
    DropdownModule,
    ImageModule,
    InputTextModule,
    InputTextareaModule,
    KeyFilterModule,
    KeyValuePipe,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MultiSelectModule,
    NgIf,
    ReactiveFormsModule,
    SharedModule,
    MatStep,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgForOf,
    MatTooltip
  ],
  templateUrl: './form-quotation-add.component.html',
  styleUrl: './form-quotation-add.component.css'
})
export class FormQuotationAddComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string | undefined;

  isSave: boolean = false;
  isDisable: boolean = true;
  isReadonly: boolean = true;

  appFormBuilder: any[] = [
    {
      code: 3,
      title: "Texte",
      tag: "input",
      type: "text"
    },
    {
      code: 4,
      title: "Numérique",
      tag: "input",
      type: "number"
    },
    {
      code: 5,
      title: "Email",
      tag: "input",
      type: "email"
    },
    {
      code: 6,
      title: "Date",
      tag: "input",
      type: "date"
    },
    {
      code: 7,
      title: "Case à Cocher",
      tag: "input",
      type: "checkbox"
    },
    {
      code: 8,
      title: "Liste Déroulante",
      tag: "select"
    },
    {
      code: 9,
      title: "Zone de Texte",
      tag: "textarea"
    }
  ];

  fieldsets: any[] = [];

  questionFieldsets: any[] = [];

  productGroupList: any[] = [];
  productImageUrl: any = null;

  //
  formQuotation: FormGroup = new FormGroup({}, undefined, undefined);
  quotationForm: QuotationForm = new QuotationForm();

  formStepList: FormGroup[] = [];
  formStep: FormGroup = new FormGroup({}, undefined, undefined);
  stepForm: StepForm = new StepForm();
  stepDto: StepDto = new StepDto();
  stepDtoList: any[] = [];
  getFormStep: any = null;

  formStepQuestionList: FormGroup[] = [];
  formStepQuestion: FormGroup = new FormGroup({}, undefined, undefined);
  stepQuestionForm: StepQuestionForm= new StepQuestionForm();
  stepQuestionDto: StepQuestionDto = new StepQuestionDto();
  stepQuestionDtoList: any[] = [];
  getFormStepQuestion: any = null;

  currentSelectedTag: any = null;

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
    this._router.navigateByUrl("/account/settings-products/forms/quotations/list");
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

    console.log("QUOTATION DATA FORM");

    console.log(this.formStepList);

    if (this.formStepList && this.formStepList.length > 0) {

      // @ts-ignore
      this.formStepList.forEach((formStep: FormGroup) => {

        console.log(formStep.value);

      });

    }

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
    this.accountService.getProductGroupList()
      .subscribe((responseData: HttpResponse<any>) => {
        this.accountService.pageLoading = false;
        console.log(responseData);
        this.productGroupList = responseData["body"];
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

      let formStep = this._fb.group(new StepForm());
      formStep.value.questions = [];
      formStep.value.questions.push(formStepQuestion)
      this.formStepList.push(formStep);

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

    this._dialog.open(FormBuilderInputTextDialogComponent, {
      hasBackdrop: false,
      width: '300px',
      height: '400px',
      data: {
        currentSelectedTag: formStepQuestion.value.currentSelectedTag
      }
    });

  }

  onGetFieldTag(formStepQuestion: FormGroup, tag: any, q: MatStep, s: MatStep) {

    console.log("TAG");
    console.log(tag);
    console.log("Q");
    console.log(q);
    console.log("S");
    console.log(s);

    let currentSelectedTag = {
      stepLabel: s.label,
      questionLabel: q.label,
      fieldTag: tag
    };

    formStepQuestion.addControl("currentSelectedTag", new FormControl(currentSelectedTag));

  }

  onRemoveStepQuestion(formStep: FormGroup, f: any) {

    if (formStep.value.questions && formStep.value.questions.length > 0) {

      let i = formStep.value.questions.lastIndexOf(f);
      let s = i;
      let e = i -1;

      if (e < 1) {
        e = 1
      }

      formStep.value.questions.splice(s, e);

    }

  }

}
