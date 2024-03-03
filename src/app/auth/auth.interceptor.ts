import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = inject(AuthService).getAuthorizationToken();

  if (authToken) {
    const authRequest = req.clone({ setHeaders: { Authorization: authToken } });
    return next(authRequest);
  } else {
    return next(req);
  }

};
