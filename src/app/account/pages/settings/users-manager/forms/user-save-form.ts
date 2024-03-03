import {FormControl, Validators} from "@angular/forms";

export class UserSaveForm {

  firstName = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  lastName = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  gender = new FormControl(null, [
    Validators.minLength(1),
    Validators.maxLength(1),
    Validators.required]);

  address = new FormControl(null, [
    Validators.minLength(2)]);

  email = new FormControl(null, [
    Validators.email,
    Validators.required]);

  phone = new FormControl(null, [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d{10}$/),
    Validators.required]);

  userType = new FormControl(null,  [Validators.required]);
  userProfile = new FormControl(null,[Validators.required]);
  enabled = new FormControl(null, [Validators.required]);

}
