import {FormControl, Validators} from "@angular/forms";

export class StepQuestionDto {
  title = new FormControl(null, [Validators.required]);
  tag = new FormControl(null, [Validators.required]);
  // @ts-ignore
  position: number = null;
  firstItem: boolean = false;
  lastItem: boolean = false;
}
