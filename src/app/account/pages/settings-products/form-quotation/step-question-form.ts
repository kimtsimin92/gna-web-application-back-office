import {FormControl, Validators} from "@angular/forms";

export class StepQuestionForm {
  position = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  field = new FormControl(null, [Validators.required]);
  attributes = new FormControl(null);
  currentSelectedTag = new FormControl(null);
  contractAdd = new FormControl(null);
  contractEdit = new FormControl(null);
  floor = new FormControl(null);
  ceiling = new FormControl(null);
}
