import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../services/personajes/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  personajes;
  page = 1;
  pageSize = 10;
  totalSize = 0;

  constructor(private personajeServ: PersonajesService,
              private _router: Router) {
    this.personajeServ.getPersonajes('').
      subscribe((data: any) => {
        console.log(data, 'response');
        this.page = 1;
        this.personajes = data.results;
        this.totalSize = data.count;
      });
  }

  ngOnInit() {
  }



  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    this.personajeServ.getPersonajes(searchValue).
      subscribe((data: any) => {
        console.log(data, 'response');
        this.page = 1;
        this.personajes = data.results;
        this.totalSize = data.count;
      });

  }


  ver_detalle(id: number) {
    console.log(id);
    this._router.navigate(['/detalle', id]);

  }

}
