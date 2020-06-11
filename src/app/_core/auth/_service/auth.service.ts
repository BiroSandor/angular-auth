import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from 'src/app/_service/config.service';
import { tap} from 'rxjs/operators';
import { User } from '../_model/user.model';
import { NotificationService } from 'src/app/_service/notification.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private readonly http: HttpClient,
  private readonly configService: ConfigService,
  private readonly notificationService: NotificationService,
  private readonly errorHandlerService:ErrorHandlerService) { }
  
  apiKey = this.configService.apiKey;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  user = new Subject<User>();

  signUp(email:string, password: string): Observable<AuthResponseBaseData> {
    return this.http.post<AuthResponseBaseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(      
      this.errorHandlerService.handleError(),
      tap(responseData => {
         this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
         );
    }))
  }

  login(email:string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })    
    .pipe(      
      this.errorHandlerService.handleError(),
      tap(responseData => {
         this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
         );
    }))
  }

  private handleAuthentication(email: string, userId:string, token:string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

}
