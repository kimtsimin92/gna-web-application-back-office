import {FormControl, Validators} from "@angular/forms";

export class UserExternalForm {

  code = new FormControl(null, [
    Validators.minLength(2)]);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  email = new FormControl(null, [
    Validators.email,
  Validators.required]);

  phone = new FormControl(null, [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d{10}$/),
    Validators.required]);

  userFirstName = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  userLastName = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  userEmail = new FormControl(null, [
    Validators.email,
    Validators.required]);

  userPhone = new FormControl(null, [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d{10}$/),
    Validators.required]);

}
