import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";

export const profileGroupGuard: CanActivateFn = (route, state) => {

  let _router =  inject(Router);
  let auth =  inject(AuthService);

  const expectedGroups: any[] = route.data['groups'];

  const hasGroup: boolean = expectedGroups.some((group) => auth.onGetProfileGroup(group));

  return hasGroup || _router.navigate(['account/dashboard']);

};
