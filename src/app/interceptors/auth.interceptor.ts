import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  const token = authService.getToken();

  if(!token){
    return next(req);
  }

  let headers : Record<string, string> = {
    Authorization: `Bearer ${token}`
  };

  //fase 6
  if(req.url.includes('/admin')){
    headers['X-Admin'] = 'true';
  }

  const clonedReq = req.clone({
    setHeaders: headers
  });

  return next(clonedReq);
};
