import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../_core/error-handler/error-handler.service';
import { map } from 'rxjs/operators';
import { Character } from '../_model/character.model';
import { Observable } from 'rxjs';
import { FirebaseResponse, FirebaseNewCharacterResponse } from '../_model/firebase-response.model';
import { mapFirebaseResponseToListOfCharacters } from './map-firebase-response-to-list-of-characters';


@Injectable({ providedIn: 'root' })
export class DataStorageService {

  baseUrl = 'https://angular-auth-ad27a.firebaseio.com/characters';

  constructor(
    private http: HttpClient,
    private errorHandlerService:ErrorHandlerService) { }

  getAllData(): Observable<Character[]> {
    return this.http.get<FirebaseResponse>(`${this.baseUrl}.json`)
    .pipe(
      map(mapFirebaseResponseToListOfCharacters),
      this.errorHandlerService.handleError(),
    )
  }

  getDataById(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}.json`)
    .pipe(
      this.errorHandlerService.handleError(),
    )
  }

  createCharacter(newCharacter: Character): Observable<FirebaseNewCharacterResponse> {
    return this.http.post<FirebaseNewCharacterResponse>(`${this.baseUrl}.json`, newCharacter)
    .pipe(
      this.errorHandlerService.handleError(),
    )
  }

  deleteCharacter(id: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}.json`)
    .pipe(
      this.errorHandlerService.handleError(),
    )
  }
}
