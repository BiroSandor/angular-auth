import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/_service/config.service';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private readonly http: HttpClient,
  private readonly configService: ConfigService) { }
  
  apiKey = this.configService.apiKey;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

  signUp(email:string, password: string): Observable<AuthResponseBaseData> {
    return this.http.post<AuthResponseBaseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError))
  }

  login(email:string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })    
    .pipe(catchError(this.handleError))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured!';
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not found!';
        break;
    }
    return throwError(errorMessage);
  }
}
