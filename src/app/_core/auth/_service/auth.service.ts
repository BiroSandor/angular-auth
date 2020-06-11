import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/_core/configuration/config.service';
import { tap} from 'rxjs/operators';
import { User } from '../_model/user.model';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
  private configService: ConfigService,
  private errorHandlerService:ErrorHandlerService,
  private router: Router) { }
  
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

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

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if( loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
      this.autoLogout(expirationDuration);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/signIn']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer )
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(email: string, userId:string, token:string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
