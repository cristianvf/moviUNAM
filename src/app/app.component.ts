import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any,image:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Inicio', component: 1, image:'assets/imgs/house.png'},
      { title: 'Pumabus', component: 2,image:'assets/imgs/bus.png'},
      { title: 'Bicipuma', component: 3 ,image:'assets/imgs/bici.png'},
      { title: 'Taxis', component: 4,image:'assets/imgs/taxi.png'},
      { title: 'Estacionamientos', component: 5,image:'assets/imgs/estacionamiento.png'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(HomePage,{elemento:page.component,titulo:page.title});
  }
  Salir(){
    //this._us.cerrar_sesion();
    this.nav.setRoot(LoginPage);
  }
}
