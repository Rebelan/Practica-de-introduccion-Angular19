import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch(error.status){
        case 400:
          console.error('Error 400: Petición incorrecta');
          break;
        case 401:
          console.error('Error 401: No autorizado');
          router.navigate(['/login']);  
        break;
        case 403:
          console.error('Error 403: Acceso  prohibido');  
        break;
        case 404:
          console.error('Error 404: Recurso no encontrado');
        break;
        case 500:
          console.error('Error 500: Error interno del servidor');  
        break;
        default:
          console.error(`Error HTTP ${error.status}:`, error.message);
      }
      return throwError(() => error);
     })
  );
};
