import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class UbicacionService {
  ubicacion:any;
  constructor( private geolocation: Geolocation) {
  }


  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
    
    this.ubicacion = resp.coords;

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.ubicacion = data.coords;
    });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
