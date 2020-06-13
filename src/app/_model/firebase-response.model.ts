import { Character } from './character.model';

export interface FirebaseResponse {
  [key: string]: Character
}

export interface FirebaseNewCharacterResponse {
  name: string;
}