import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigApi } from 'src/app/config';


@Injectable({
  providedIn: 'root'
})
export class ComicService {

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
    console.log(params);


    return this.http.get(url + paramsConst + params);

  }


  getComic(id: number) {
    let parametros = [];
    return this.getQuery(`v1/public/comics/${id}`, parametros).
      pipe(map(data => data['data']));
  }




}
