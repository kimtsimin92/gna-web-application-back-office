import {FormControl, Validators} from "@angular/forms";

export class SubscriptionForm {
  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null);
  formQuotation = new FormControl(null, [Validators.required]);
}
