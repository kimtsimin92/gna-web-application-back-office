import {FormControl, Validators} from "@angular/forms";
import {StepQuestionDto} from "./step-question-dto";

export class StepDto {
  position = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  illustration = new FormControl(null);
  questions: StepQuestionDto[] = [];
}
