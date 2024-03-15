import {FormControl, Validators} from "@angular/forms";
import {StepQuestionDto} from "./step-question-dto";

export class StepDto {
  title = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  illustration = new FormControl(null);
  questions: StepQuestionDto[] = [];
  // @ts-ignore
  position: number = null;
  firstItem: boolean = false;
  lastItem: boolean = false;
}
