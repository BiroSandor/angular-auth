import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NotificationService } from 'src/app/_service/notification.service';
import { OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private readonly notificationService: NotificationService) { }


  handleError<T>(): OperatorFunction<T,T> {
    return catchError((errorResponse: HttpErrorResponse) => {
      let errorMessage = 'Unknown error occured!';
      if(!errorResponse.error || !errorResponse.error.error) {
        this.notificationService.notify(errorMessage, 4000);
        return throwError(errorMessage);
      }

      if(errorResponse.status === 401) {
        errorMessage = 'Unauthorized, Please login!'
        this.notificationService.notify(errorMessage, 4000);
        return throwError(errorMessage);
      }
  
      switch(errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists!';
          break;
  
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email is not found!';
          break;
  
        case 'INVALID_EMAIL':
          errorMessage = 'This email is invalid!';
          break;
      }
      this.notificationService.notify(errorMessage, 4000);
      return throwError(errorMessage);
    });
  }
}
