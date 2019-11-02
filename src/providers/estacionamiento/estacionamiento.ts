import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from "../../config/url.servicios";

@Injectable()
export class EstacionamientoService {

  constructor(public http: HttpClient) {
  }

  getListEstacionamiento(){
    let url = URL_SERVICIOS + "/estacionamiento/getListEstacionamiento";

    return this.http.post(url,{}).map(resp => resp);
  }

  getEstacionamiento(estacionamientoId:number){
    let url = URL_SERVICIOS + "/estacionamiento/getEstacionamiento";
    let datos = {"estacionamientoId":estacionamientoId};
    return this.http.post(url,datos).map(resp => resp);
  }

}