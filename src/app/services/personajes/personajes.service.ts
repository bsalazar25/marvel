import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigApi } from 'src/app/config';
import { Md5 } from 'ts-md5/dist/md5';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { }


  getQuery(query: string, parametros?: string[]) {

    const url = ConfigApi.urlBase + query;
    const ts = Date.now();
    const md5 = Md5.hashStr(ts + ConfigApi.privateKey + ConfigApi.publicKey);
    const paramsConst = `?apikey=${ConfigApi.publicKey}&ts=${ts}&hash=${md5}`;

    let params = '';
    if (parametros.length > 0) {

      parametros.forEach(element => {
        params = params + element.toString();
      });
    }


    return this.http.get(url + paramsConst + params);

  }


  getPersonajes(sort: string, nombre?: string) {

    let parametros = ['&limit=100'];
    if (sort === '') { sort = 'name'; }
    parametros.push(`&orderBy=${sort}`);
    if (nombre.length > 0) {
      parametros.push(`&nameStartsWith=${nombre}`);
    }
    // &orderBy=modified


    return this.getQuery('v1/public/characters', parametros).
      pipe(map(data => data['data']));


  }


  getPersonaje(id: number) {
    let parametros = [];
    return this.getQuery(`v1/public/characters/${id}`, parametros).
      pipe(map(data => data['data']));
  }


  getComics(id: number) {
    let parametros = [];
    return this.getQuery(`v1/public/characters/${id}/comics`, parametros).
      pipe(map(data => data['data']));
  }





}
