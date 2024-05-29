import {FormControl, Validators} from "@angular/forms";

export class GuaranteeForm {

  code = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  franchiseMinimum = new FormControl(0,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);
  franchiseMaximum = new FormControl(0,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);
  franchiseRate = new FormControl(0, [
    Validators.pattern(/^\d+(\.\d+)?$/)]);

  deficiencyDeadlineUnit = new FormControl(null);
  deficiencyDeadline = new FormControl(null,
    [
    Validators.pattern(/^\d+$/)]);

  subscriptionMinimumPeriod = new FormControl(0,
    [Validators.min(1),
    Validators.required,
      Validators.pattern(/^\d+$/)]);

  subscriptionMaximumPeriod = new FormControl(0,
    [Validators.min(1),
    Validators.required,
      Validators.pattern(/^\d+$/)]);

  guaranteeFloor = new FormControl(0,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);
  guaranteeCeiling = new FormControl(0,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  premiumMinimum = new FormControl(0,
    [Validators.min(1),
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  taxRate = new FormControl(0,
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
