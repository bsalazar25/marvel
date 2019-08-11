import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../services/personajes/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search = '';
  ordernar = '';
  personajes;
  page = 1;
  pageSize = 10;
  totalSize = 0;
  favorites: any[] = [];

  constructor(private personajeServ: PersonajesService,
    private _router: Router) {
    this.personajeServ.getPersonajes(this.ordernar, this.search).
      subscribe((data: any) => {
        this.page = 1;
        this.personajes = data.results;
        this.totalSize = data.count;
      });
    this.obtenerFavorites();

  }

  ngOnInit() {
  }

  obtenerFavorites() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
  }

  onSearchChange(searchValue: string): void {
    this.search = searchValue;
    this.personajeServ.getPersonajes(this.ordernar, searchValue).
      subscribe((data: any) => {
        this.page = 1;
        this.personajes = data.results;
        this.totalSize = data.count;
      });

  }

  onChangeSort(value: string) {
    this.ordernar = value;
    this.personajeServ.getPersonajes(this.ordernar, this.search).
      subscribe((data: any) => {
        this.page = 1;
        this.personajes = data.results;
        this.totalSize = data.count;
      });
  }

  ver_detalle(id: number) {
    this._router.navigate(['/detalle', id]);

  }

  eliminar_fav(item: any) {

    // eliminar de favorito
    this.favorites.splice(this.buscarFavorite(item.id), 1);

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }


  buscarFavorite(id: number) {


    return this.favorites.findIndex(item => item.id == id);

  }

}
