import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const profilePermissionGuard: CanActivateFn = (route, state) => {

  let _router =  inject(Router);
  let auth =  inject(AuthService);

  const profileGroups: any[] = route.data['groups'];
  const profileRoles: any[] = route.data['roles'];
  const profilePermissions: any[] = route.data['permissions'];

  const hasPermission: boolean = auth.onGetProfilePermission(
    profileGroups[0],
    profileRoles[0],
    profilePermissions[0]);

  return hasPermission || _router.navigate(['account/dashboard']);

};
