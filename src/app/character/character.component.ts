import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../_service/data-storage.service';
import { map, switchMap } from 'rxjs/operators';
import { Character } from '../_model/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private dataStorageService: DataStorageService) { }

  characterToShow: Character;

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(characterId => this.dataStorageService.getDataById(characterId))
    ).subscribe(character => {
      this.characterToShow = character
    })
  }

}
