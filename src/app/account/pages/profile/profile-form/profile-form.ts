import {FormControl, Validators} from "@angular/forms";

export class ProfileForm {

  phone = new FormControl(null, [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d{10}$/),
    Validators.required]);

}
