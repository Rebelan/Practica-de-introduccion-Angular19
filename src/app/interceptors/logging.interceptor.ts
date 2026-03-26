import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(`[HTTP REQUEST] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(`[HTTP RESPONSE] ${req.method} ${req.url} -> ${event.status}`);
      }
    }),

    catchError((error) => {
      console.log(
        `[HTTP ERROR] ${req.method} ${req.url} -> ${error.status}`
      );
      return throwError(() => error);
    })
  );
};
