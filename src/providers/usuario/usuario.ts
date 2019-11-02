import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from "../../config/url.servicios";

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioService {

  productos:any[] = [];
  regreso:boolean = false;

  constructor(public http: HttpClient,
              private platform:Platform,
              private storage:Storage) {

  }

  registrar_usuario(usuNombre:string,usuPrimerApellido:string,
      usuSegundoApellido:string,usuCorreo:string,usuContrasena:string){

    let datos = {"usuNombre":usuNombre,"usuPrimerApellido":usuPrimerApellido,"usuSegundoApellido":usuSegundoApellido,"usuCorreo":usuCorreo,"usuContrasena":usuContrasena};
    let url = URL_SERVICIOS + "/usuario/guardar"; 
    return this.http.post( url, datos )
            .map( resp => resp);
  }

  login(usuCorreo:string,usuContrasena:string){
    let datos = {"usuCorreo":usuCorreo,"usuContrasena":usuContrasena};
    let url = URL_SERVICIOS + "/usuario/getUsuario";
    return this.http.post( url,datos ).map( resp => resp);

  }

  cerrar_sesion(){
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioNombre");
  }

  guardar_storage(usuNombre:string,usuarioId:string){
    if (this.platform.is("cordova")) {
      this.storage.set("usuarioId",usuarioId);
      this.storage.set("usuarioNombre",usuNombre);
    }else{
      if (usuarioId) {
        localStorage.setItem("usuarioId",usuarioId);
        localStorage.setItem("usuarioNombre",usuNombre);
      }else{
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("usuarioNombre");
      }
    }
  }
}
