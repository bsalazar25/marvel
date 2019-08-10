import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes/personajes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleComicComponent } from '../detalle-comic/detalle-comic.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  personaje: any = {};
  comics: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private personajeServ: PersonajesService,
    private modalService: NgbModal) {

    this._activatedRoute.params.subscribe(params => {
      this.personajeServ.getPersonaje(params['id']).
        subscribe((data: any) => {
          this.personaje = data.results[0];




          console.log(this.personaje, 'personaje');

        });
      this.personajeServ.getComics(params['id']).
        subscribe((data: any) => {
          this.comics = data.results;
          console.log(this.comics, 'comics');
        });
    });

  }

  ngOnInit() {
  }

  openFormModal(id: number) {
    console.log(id);

    const modalRef = this.modalService.open(DetalleComicComponent);
    modalRef.componentInstance.id = id; // should be the id
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  verComic(url: string) {
    console.log(url);


  }


}
