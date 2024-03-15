import {FormControl, Validators} from "@angular/forms";
import {StepQuestionForm} from "./step-question-form";

export class StepForm {
  title = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  illustration = new FormControl(null);
  questions: any[] = [];
  // @ts-ignore
  position: number = null;
  firstItem: boolean = false;
  lastItem: boolean = false;
}
