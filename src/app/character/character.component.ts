import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../_service/data-storage.service';
import { map, switchMap } from 'rxjs/operators';
import { Character } from '../_model/character.model';
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private dataStorageService: DataStorageService,
    private notificationService: NotificationService,
    private router: Router) { }

  characterToShow: Character;
  characterId: string;
  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(params => this.characterId = params.id),
      switchMap(characterId => this.dataStorageService.getDataById(characterId))
    ).subscribe(character => {
      this.characterToShow = character
    })
  }

  deleteCharacter() {
    this.dataStorageService.deleteCharacter(this.characterId)
      .subscribe(()=>{
        this.notificationService.notify(
          `${this.characterToShow.name} successfully has been deleted!`,
          5000
        )
        this.router.navigate(['/home'])
      })
  }

}
