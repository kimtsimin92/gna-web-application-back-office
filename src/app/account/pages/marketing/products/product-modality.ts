import {FormControl, Validators} from "@angular/forms";

export class ProductModality {
  id = new FormControl(null);
  position = new FormControl(null, [Validators.required]);
  name = new FormControl(null, [Validators.required]);
  duration = new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]);
  unitId = new FormControl(null, [Validators.required]);
  weighting = new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]);
  start!: boolean;
}
