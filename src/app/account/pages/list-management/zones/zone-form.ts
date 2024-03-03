import {FormControl, Validators} from "@angular/forms";

export class ZoneForm {
  code = new FormControl(null);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);
}
