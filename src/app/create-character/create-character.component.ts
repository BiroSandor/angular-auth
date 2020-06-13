import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../_service/data-storage.service';
import { Character } from '../_model/character.model';
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private dataStorageService: DataStorageService,
    private notificationService: NotificationService) { }
  createForm: FormGroup;
  
  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      picture: ['', Validators.required],
    });
  }

  createCharacter(){
    this.dataStorageService.createCharacter(this.createForm.value)
    .subscribe(response => {
      this.notificationService.notify(
        `The character successfully created with id ${response.name}`,
        5000
      )
    })

  }
 
}
