import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginForm} from "../../form/login-form";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../auth.service";
import {Router, RouterLink} from "@angular/router";
import {AccountService} from "../../../account/account.service";
import {GnaLoadingComponent} from "../../../account/transitions/gna-loading/gna-loading.component";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIcon,
    MatError,
    MatProgressSpinner,
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    MatSuffix,
    MatButton,
    MatPrefix,
    RouterLink,
    GnaLoadingComponent,
    InputTextModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, DoCheck {

  form: FormGroup = new FormGroup({}, undefined, undefined);
  authRequest = new LoginForm();
  hide = true;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    public auth: AuthService,
    private _router: Router,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.auth.clearAll();

 this.accountService.loadingPage = true;
    setTimeout(() => {
      this.accountService.loadingPage = false;
    }, 1000);

    this.form = this._fb.group(this.authRequest);
  }

  onAuth() {
    console.log(this.form.value);
    this.auth.loadingAuth(this.form.value);
  }

  getErrorMessageEmail() {
    return this.authRequest.username.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.authRequest.username.hasError('email') ? "Veuiller entrer une adresse email valide.": '';
  }

  getErrorMessagePassword() {
    return this.authRequest.password.hasError('required') ? 'Vous devez entrer une valeur.' :
      this.authRequest.password.invalid ? "Veuillez entrer un mot de passe valide.": '';
  }

  getResponseErrorMessage() {
  }

  ngDoCheck(): void {
    if (this.auth.isError) {
      this.getResponseErrorMessage();
    }
  }



}
