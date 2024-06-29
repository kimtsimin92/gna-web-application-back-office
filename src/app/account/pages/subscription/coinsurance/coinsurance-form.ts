import {FormControl, Validators} from "@angular/forms";

export class CoinsuranceForm {

  userId = new FormControl(null, [
    Validators.required]);

  subscriptionId = new FormControl(null, [
    Validators.required]);

  coInsurers = new FormControl(null, [
    Validators.required]);

  rate = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/),
      Validators.required]);

  message = new FormControl(null);
  companyName = new FormControl(null);

}
