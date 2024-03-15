import {FormControl, Validators} from "@angular/forms";

export class QuotationForm {
  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  productGroup = new FormControl(null, [Validators.required]);
}
