import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MapaPage } from '../pages/mapa/mapa';
import { RegistroPage } from '../pages/registro/registro';

//Storage
import { IonicStorageModule } from '@ionic/storage';

//Plugins
import { Geolocation } from '@ionic-native/geolocation';

//Mapas
import { AgmCoreModule } from '@agm/core';

//FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../providers/usuario/usuario';
import { UbicacionService } from '../providers/ubicacion/ubicacion';
import { RutaService } from '../providers/ruta/ruta';
import { EstacionService } from '../providers/estacion/estacion';
import { firebaseConfig } from '../config/firebase.config';
import { EstacionamientoService } from '../providers/estacionamiento/estacionamiento';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MapaPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWfXD_inEXDTC0XTNMPfYUNxoUV13vPm0'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MapaPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    UbicacionService,
    Geolocation,
    RutaService,
    EstacionService,
    EstacionamientoService,
  ]
})
export class AppModule {}
