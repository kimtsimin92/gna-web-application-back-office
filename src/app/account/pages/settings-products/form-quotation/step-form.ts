import {FormControl, Validators} from "@angular/forms";
import {StepQuestionForm} from "./step-question-form";

export class StepForm {
  position = new FormControl(null);
  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  illustration = new FormControl(null);
  questions: any[] = [];
}
