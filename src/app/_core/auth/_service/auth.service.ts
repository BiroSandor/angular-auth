import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/_core/configuration/config.service';
import { tap} from 'rxjs/operators';
import { User } from '../_model/user.model';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
  private configService: ConfigService,
  private errorHandlerService:ErrorHandlerService) { }
  
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  user = new BehaviorSubject<User>(null);

  signUp(email:string, password: string): Observable<AuthResponseBaseData> {
    return this.http.post<AuthResponseBaseData>(this.signUpUrl + this.configService.getConfig('apiKey'), {
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
    return this.http.post<AuthResponseData>(this.loginUrl + this.configService.getConfig('apiKey'), {
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
