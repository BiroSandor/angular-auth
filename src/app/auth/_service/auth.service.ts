import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData, AuthResponseBaseData } from '../_model/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private readonly http: HttpClient) { }
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC3BLD9RTvTX2ff8yTUHuxhotRrAZe6qo';
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC3BLD9RTvTX2ff8yTUHuxhotRrAZe6qo';

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
