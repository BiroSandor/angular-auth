import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../_service/data-storage.service';
import { Character } from '../_model/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly dataStorageService: DataStorageService, private router: Router) { }
  charactersToShow: Character[];

  ngOnInit() {
  }

  navigateToCharacterDetails(id: string) {
    this.router.navigate(['/character', id])
  }

  getData() {
    this.dataStorageService.getAllData()
      .subscribe(characters => {
        this.charactersToShow = characters;
        console.log(characters)
      })
  }

}
