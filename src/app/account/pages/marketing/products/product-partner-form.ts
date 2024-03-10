import {FormControl, Validators} from "@angular/forms";

export class ProductPartnerForm {

  partnerId = new FormControl(null, [
    Validators.required]);

  partnerAccessoryAmount = new FormControl(null,
    [Validators.pattern(/^\d+$/)]);

  partnerCommissionRate = new FormControl(null,
    [Validators.pattern(/^\d+(\.\d+)?$/)]);

  sponsorshipCode = new FormControl(null);

}
