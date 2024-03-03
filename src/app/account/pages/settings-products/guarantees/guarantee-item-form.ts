import {FormControl, Validators} from "@angular/forms";

export class GuaranteeItemForm {
  id = new FormControl(null);
  code = new FormControl(null);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  capital = new FormControl(null,
    [Validators.min(1),
      Validators.required,
      Validators.pattern(/^\d+$/)]);

  franchiseMinimum = new FormControl(null,
    [Validators.min(0),
      Validators.pattern(/^\d+$/)]);

  franchiseMaximum = new FormControl(null,
    [Validators.min(0),
      Validators.pattern(/^\d+$/)]);

  franchiseRate = new FormControl(null, [
    Validators.pattern(/^\d+(\.\d+)?$/)]);

}
