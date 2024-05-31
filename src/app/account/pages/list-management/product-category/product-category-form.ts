import {FormControl, Validators} from "@angular/forms";

export class ProductCategoryForm {
  code = new FormControl(null);

  name = new FormControl(null, [
    Validators.minLength(2),
    Validators.required]);

  description = new FormControl(null);

  branch = new FormControl(null, [
    Validators.required]);
}
