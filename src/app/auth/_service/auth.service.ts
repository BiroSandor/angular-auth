import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/_service/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private readonly http: HttpClient,
  private readonly configService: ConfigService) { }

  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.configService.apiKey}`;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.configService.apiKey}`;

  signUp(email:string, password: string): Observable<AuthResponseBaseData> {
    return this.http.post<AuthResponseBaseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  login(email:string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

}
