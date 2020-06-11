import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../_service/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  getData() {
    this.dataStorageService.getAllData().subscribe(resp => console.log(resp))
  }

}
