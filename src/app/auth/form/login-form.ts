import {FormControl, Validators} from "@angular/forms";

export class LoginForm {

  username = new FormControl(null, [
    Validators.email,
    Validators.minLength(5),
    Validators.required]);

  password = new FormControl(null, [
    Validators.required,
    Validators.minLength(8)]);

}
