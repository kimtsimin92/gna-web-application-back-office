import {FormControl, Validators} from "@angular/forms";

export class GuaranteeForm {

  code = new FormControl(null, );

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  franchiseMinimum = new FormControl(null,
    [
      Validators.pattern(/^\d+$/)]);
  franchiseMaximum = new FormControl(null,
    [
      Validators.pattern(/^\d+$/)]);
  franchiseRate = new FormControl(null, [
    Validators.pattern(/^\d+(\.\d+)?$/)]);

  deficiencyDeadlineUnit = new FormControl(null);
  deficiencyDeadline = new FormControl(null,
    [
    Validators.pattern(/^\d+$/)]);

  subscriptionMinimumPeriod = new FormControl(null,
    [Validators.min(1),
    Validators.required,
      Validators.pattern(/^\d+$/)]);

  subscriptionMaximumPeriod = new FormControl(null,
    [Validators.min(1),
    Validators.required,
      Validators.pattern(/^\d+$/)]);

  guaranteeFloor = new FormControl(null,
    [
      Validators.pattern(/^\d+$/)]);
  guaranteeCeiling = new FormControl(null,
    [
      Validators.pattern(/^\d+$/)]);

  premiumMinimum = new FormControl(null,
    [Validators.min(1),
      Validators.pattern(/^\d+$/)]);

  taxRate = new FormControl(null,
    [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  discountApplicable = new FormControl(null,
    [Validators.required]);

  zone = new FormControl(null,
    [Validators.required]);

 partners = new FormControl(null);
 description = new FormControl(null);
  clauses = new FormControl(null);

}
