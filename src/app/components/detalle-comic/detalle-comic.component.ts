import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ComicService } from '../../services/comic/comic.service';

@Component({
  selector: 'app-detalle-comic',
  templateUrl: './detalle-comic.component.html',
  styleUrls: ['./detalle-comic.component.css']
})

export class DetalleComicComponent implements OnInit {
  @Input() id: number;
  closeResult: string;
  comicData: any;
  favorites: any[] = [];
  isInFav = false;

  constructor(
    public activeModal: NgbActiveModal,
    private comicServ: ComicService) {
    this.obtenerFavorites();

  }

  ngOnInit() {
    this.comicServ.getComic(this.id).
      subscribe((data: any) => {
        this.comicData = data.results[0];
        console.log(this.comicData, 'comic');
        if (this.favorites.length > 0) {

          if (this.buscarFavorite(this.id) > -1) {
            this.isInFav = true;
          }
          console.log(this.isInFav, 'is in');
        }
      });

  }

  obtenerFavorites() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
      console.log(this.favorites, 'this.favorites');
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  

  buscarFavorite(id: number) {


    return this.favorites.findIndex(item => item.id == id);

  }


  addFavorite() {
    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
      console.log(this.favorites, 'this.favorites');


      // busco si existe en el array
      if (this.buscarFavorite(this.id) > -1) {

        // eliminar de favorito
        this.favorites.splice(this.buscarFavorite(this.id), 1);

      } else {
        this.favorites.push(this.comicData);
      }

    } else {

      this.favorites.push(this.comicData);
    }

    console.log(this.favorites, 'this.favorites despues de insertar');
    // guardo en el localStorage
    localStorage.setItem('favorites', JSON.stringify(this.favorites));

  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

}
