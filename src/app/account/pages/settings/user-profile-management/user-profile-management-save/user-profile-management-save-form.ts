import {FormControl, FormGroup, Validators} from "@angular/forms";

export class UserProfileManagementSaveForm {

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  description = new FormControl(null);

}
