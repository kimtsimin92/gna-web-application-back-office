import {FormControl, Validators} from "@angular/forms";

export class ProfilePasswordForm {

  passwordOld = new FormControl(null, [
    Validators.minLength(8),
    Validators.required]);

  passwordNew = new FormControl(null, [
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    Validators.required]);

  passwordConfirm = new FormControl(null, [
    Validators.required]);

  passwordMatchValidator(control: FormControl) {
    const passwordNew = this.passwordNew.value;
    const passwordConfirm = control.value;

    if (passwordNew === passwordConfirm) {
      return null;
    } else {
      return { passwordMatch: true };
    }
  }

}

