import { FirebaseResponse } from '../_model/firebase-response.model';
import { Character } from '../_model/character.model';

export function mapFirebaseResponseToListOfCharacters(firebaseResponse: FirebaseResponse): Character[] {
    const mappedResponse: Character[] = [];
    for (const key in firebaseResponse) {
      if (firebaseResponse.hasOwnProperty(key)) {
        mappedResponse.push({ ...firebaseResponse[key], id: key });
      }
    }
    return mappedResponse;
}