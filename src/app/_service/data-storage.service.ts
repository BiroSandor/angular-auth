import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../_core/error-handler/error-handler.service';


@Injectable({ providedIn: 'root' })
export class DataStorageService {

  baseUrl = 'https://angular-auth-ad27a.firebaseio.com/characters.json';

  constructor(
    private http: HttpClient,
    private errorHandlerService:ErrorHandlerService) { }

  getAllData() {
    return this.http.get(this.baseUrl)
    .pipe(
      this.errorHandlerService.handleError(),
    )
  }
}
