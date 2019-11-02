import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class EstacionService {

  constructor(public http: HttpClient) {
  }

  getEstaciones(rutaId:number){
    let datos = {"rutaId":rutaId};
    let url = URL_SERVICIOS + "/estacion/getEstacionRuta";

    return this.http.post(url,datos).map(resp => resp);
  }

  getEstacionesCercanas(latitud:number,longitud:number){
    let datos = {"x":latitud,"y":longitud};
    let url = URL_SERVICIOS + "/estacion/getEstacionesCercanas";

    return this.http.post(url,datos).map(resp => resp);
  }

}
