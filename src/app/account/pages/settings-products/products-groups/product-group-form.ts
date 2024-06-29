import {FormControl, Validators} from "@angular/forms";

export class ProductGroupForm {

  code = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  description = new FormControl(null);

  // @ts-ignore
  category = new FormControl(null);

  accessoryTaxRate = new FormControl(null,
    [
      Validators.required,
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  accessoryAmountCompany = new FormControl(null,
    [Validators.min(1),
      Validators.required,
      Validators.pattern(/^\d+$/)]);

  accessoryAmountIntermediate = new FormControl(null,
    [Validators.min(1),
      Validators.required,
      Validators.pattern(/^\d+$/)]);

  coverageRate = new FormControl(null);

  // @ts-ignore
  managementMode = new FormControl<boolean>(null);
  // @ts-ignore
  beneficiaries = new FormControl<boolean>(null);
  // @ts-ignore
  maturityNotice = new FormControl<boolean>(null);
  paymentMethodId = new FormControl(null);
  periodicityId = new FormControl(null);
  insuranceSectorId = new FormControl(null);
  apiIds = new FormControl<number[]>([]);
  guarantees = new FormControl<any[]>([], [Validators.required]);
  clauses = new FormControl(null);

}
