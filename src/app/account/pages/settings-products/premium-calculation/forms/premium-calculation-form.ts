import {FormControl, Validators} from "@angular/forms";

export class PremiumCalculationForm {
  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  productGroup = new FormControl(null, [Validators.required]);
  guarantee = new FormControl(null, [Validators.required]);
  quotationForm= new FormControl(null, [Validators.required]);
}
