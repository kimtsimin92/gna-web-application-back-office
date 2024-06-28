import {FormControl, Validators} from "@angular/forms";

export class ReinsuranceForm {

  userId = new FormControl(null, [
    Validators.required]);

  subscriptionId = new FormControl(null, [
    Validators.required]);

  reInsurers = new FormControl(null, [
    Validators.required]);

  partRetained = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/),
      Validators.required]);

  partTreaty = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/),
      Validators.required]);

  needFac = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/),
      Validators.required]);

  message = new FormControl(null);

  companyName = new FormControl(null);

}
