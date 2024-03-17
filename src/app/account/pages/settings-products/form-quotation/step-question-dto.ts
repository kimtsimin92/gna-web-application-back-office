import {FormControl, Validators} from "@angular/forms";

export class StepQuestionDto {
  position = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  field = new FormControl(null, [Validators.required]);
  attributes = new FormControl(null);
  currentSelectedTag = new FormControl(null);
}
