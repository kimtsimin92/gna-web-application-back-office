import {FormControl, Validators} from "@angular/forms";

export class PartnerSaveForm {

  code = new FormControl(null);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  address = new FormControl(null, Validators.minLength(2));
  phone = new FormControl(null, [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d{10}$/)]);
  email = new FormControl(null, Validators.email);

  partnerType = new FormControl(null,[Validators.required]);

}
