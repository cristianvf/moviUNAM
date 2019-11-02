import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UsuarioService } from "../../providers/usuario/usuario";

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuNombre:string = "";
  usuPrimerApellido:string = "";
  usuSegundoApellido:string = "";
  usuCorreo:string = "";
  password:string="";
  confirmarPassword:string="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _us: UsuarioService,
              private alertCtrl:AlertController,
              private loadCtrl:LoadingController) {
  }

  aceptarRegistro(){
    if (this.password == this.confirmarPassword) {
      this._us.registrar_usuario(this.usuNombre,this.usuPrimerApellido,
                                this.usuSegundoApellido,this.usuCorreo,this.password)
              .subscribe( data => {
                if(data["estado"]){
                  let loading = this.loadCtrl.create({
                    spinner:'hide',
                    content:"Cuenta registrada."
                  });
                  loading.present();
                  setTimeout(() => {
                    this.navCtrl.setRoot(LoginPage);
                  }, 2000);

                  setTimeout(() => {
                    loading.dismiss();
                  }, 3000);

                }else{
                  let loading = this.loadCtrl.create({
                    spinner:'hide',
                    content:"Hubo un error.Vuelva a intentarlo mas tarde."
                  });
                  loading.present();
                  setTimeout(() => {
                    loading.dismiss();
                  }, 2000);
                }
              });
    }else{
      this.alertCtrl.create({
        title:"Contraseñas incorrectas",
        subTitle:"Las contraseñas deben de ser las mismas, por favor vuelva a introducirlas.",
        buttons:["Ok"]
      }).present();
    }
  }

  cancelarRegistro(){
    this.navCtrl.setRoot(LoginPage);
  }

}
