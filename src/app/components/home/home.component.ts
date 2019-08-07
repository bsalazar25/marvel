import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../services/personajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _personajes: PersonajesService) {
    _personajes.getHeroes();
   }

  ngOnInit() {
  }

}
