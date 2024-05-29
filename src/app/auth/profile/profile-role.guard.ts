import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const profileRoleGuard: CanActivateFn = (route, state) => {

  let _router =  inject(Router);
  let auth =  inject(AuthService);

  const expectedRoles: any[] = route.data['roles'];

  const hasRole: boolean = expectedRoles.some((role) => auth.onGetProfileRole(role));

  return hasRole || _router.navigate(['account/dashboard']);

};
