import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { RegistroPage } from "../registro/registro"
import { UsuarioService } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string = "";
  pass:string = "";
  nombre:string="";
  usuarioId:string="";

  constructor(public navCtrl: NavController,
              private alertCtrl:AlertController,
              private _us: UsuarioService) {
                this._us.cerrar_sesion();
  }
  
  continuar(){

    this._us.login(this.usuario,this.pass).subscribe( data =>{

       if(!isNaN(data["usuarioId"])){
         this.usuarioId = data["usuarioId"];
         this.nombre = data["usuNombre"]+" "+data["usuPrimerApellido"] + " "+data["usuSegundoApellido"];
         this._us.guardar_storage(this.nombre,this.usuarioId );
         this.navCtrl.setRoot(HomePage);
       }else{
         this.alertCtrl.create({
           title:"Datos incorrectos",
           subTitle:"Usuario o Contraseña incorecta.Por favor intentelo nuevamente.",
           buttons:['OK!']
         }).present();
       }
    });

  }

  registrar(){
    this.navCtrl.setRoot(RegistroPage);
  }

  recuperarPassword(){
    console.log("HOLA");
  }

}
