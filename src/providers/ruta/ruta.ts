import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class RutaService {

  constructor(public http: HttpClient) {

  }

  getRuta(rutaId:number){
    let datos = {"rutaId":rutaId};
    let url = URL_SERVICIOS + "/ruta/getRuta";

    return this.http.post(url,datos).map(resp => resp);

  }

  obtenerListadoRutas(){
      let url = URL_SERVICIOS + "/ruta/getListadoRutas";
      return this.http.post(url,{} ).map(resp => resp);
  }

}
