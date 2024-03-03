import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {

  let _router =  inject(Router);
  let auth =  inject(AuthService);

  if (auth.isLoggedIn) {
    return true;
  }

  if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('typeToken') && !sessionStorage.getItem('accessToken')) {
    _router.navigateByUrl('/login').then(() => {
      auth.removeJWT();
    });
  }
  return false;

};
