import {FormControl, Validators} from "@angular/forms";

export class ProductForm {

  code = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  description = new FormControl(null);

  crossSellingProductCode = new FormControl(null);
  clauses = new FormControl(null);

  segment = new FormControl(null,
    [Validators.required]);
  group = new FormControl(null,
    [Validators.required]);
  incentives = new FormControl<any[]>([]);
  partners = new FormControl<any[]>([]);

  cashBackRate = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  commercialDiscountRate = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);


  crossSellingDiscountRate = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)])

  premiumIncreaseRate = new FormControl(null,
    [
      Validators.pattern(/^\d+(\.\d+)?$/)]);

  loyaltyPoint = new FormControl(null,
    [
      Validators.pattern(/^\d+$/)]);


  // @ts-ignore
  renewable = new FormControl<boolean>(null,
    [Validators.required]);
  // @ts-ignore
  tacitAgreement = new FormControl<boolean>(null,
    [Validators.required]);
  // @ts-ignore
  backOfficeValidation = new FormControl<boolean>(null);
  // @ts-ignore
  advertisementObject = new FormControl<boolean>(null);
  advertisementObjectFile = new FormControl(null);

}
