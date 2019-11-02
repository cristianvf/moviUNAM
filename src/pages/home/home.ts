import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LATITUD_DEFAULT,LONGITUD_DEFAULT,INICIO,PUMABUS,BICIPUMA,TAXIS,ESTACIONAMIENTOS,RUTA1,RUTA2,
  RUTA3,RUTA4,RUTA5,RUTA6,RUTA7,RUTA8,RUTA9,RUTA10,RUTA11,RUTA12,RUTA13,RUTA_BICIPUMA,COLOR_RUTA1,COLOR_RUTA2,
  COLOR_RUTA3,COLOR_RUTA4,COLOR_RUTA5,COLOR_RUTA6,COLOR_RUTA7,COLOR_RUTA8,COLOR_RUTA9,COLOR_RUTA10,
  COLOR_RUTA11,COLOR_RUTA12,COLOR_RUTA13, COLOR_RUTA_BICIPUMA } from '../../config/url.servicios';
import { RutaService } from '../../providers/ruta/ruta';
import { EstacionService } from '../../providers/estacion/estacion';
import { RUTA_IMG,IMG_ESTACION_BICI,IMG_ESTACION_PUMA, IMG_ESTACION_CERCANA, IMG_CAMION_PUMABUS } from '../../config/url.servicios';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EstacionamientoService } from '../../providers/estacionamiento/estacionamiento';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat: number = LATITUD_DEFAULT;
  public lng: number = LONGITUD_DEFAULT;
  public opcion : number = 1;
  public titulo : string = "Inicio";
  public rutas : any;
  public color : string;
  public icono : string;
  public geometria:Array<{lat:number,lng:number}> = [];
  public estaciones:Array<{nombre:string,lat:number,lng:number}>;
  public camionesObs: Observable<any[]>;
  public camiones : Array<any>;
  public iconoCamion: string;
  public estacionamientos:any;
  public lugaresEsta: any;
  public lugares : Array<{lat:number,lng:number,lugares:number}> = [{lat:null,lng:null,lugares:null}];

  constructor(public navCtrl: NavController,private geolocation: Geolocation,public navParams: NavParams,
    public _ruta:RutaService, public _estacion:EstacionService,public db: AngularFirestore,
    public _estacionamiento:EstacionamientoService) {
      this.opcion = navParams.get('elemento');
      this.titulo = navParams.get('titulo');
      this.iniciarGeolocalizacion();
  }

  ionViewDidLoad() {
    this.opcionMenuSeleccionado(this.opcion);
  }

  iniciarGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
    });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  opcionMenuSeleccionado(elemento){
    switch (elemento) {
      case INICIO:
        this.icono = RUTA_IMG + IMG_ESTACION_CERCANA;
        this.obtieneEstacionesCercanas();
        break;

      case PUMABUS:
        this.icono = RUTA_IMG + IMG_ESTACION_PUMA;
        this.iconoCamion = RUTA_IMG + IMG_CAMION_PUMABUS;
        this.obtieneRutas();
        break;

      case BICIPUMA:
        this.icono = RUTA_IMG + IMG_ESTACION_BICI;
        this.cambioRuta(RUTA_BICIPUMA);
        //this.items = this.db.collection('14').valueChanges();
        break;

      case TAXIS:
        break;

      case ESTACIONAMIENTOS:
      this.obtieneEstacionamientos();
        break;

      default:
        this.icono = RUTA_IMG + IMG_ESTACION_CERCANA;
        this.obtieneEstacionesCercanas();
        break;
    }
  }

  obtieneRutas(){
    this._ruta.obtenerListadoRutas().subscribe(data => {
      this.rutas = data;
    });
  }

  cambioRuta($event){
    this.colorRuta($event);
    this._ruta.getRuta($event).subscribe(data => {
      let puntos = data[0].replace("LINESTRING(","");
      puntos = puntos.replace(")","");
      puntos = puntos.split(",");
      for (let i = 0; i < puntos.length; i++) {
        puntos[i] =puntos[i].split(" ");
      }
      this.generaPolylinea(puntos);
    });

    this._estacion.getEstaciones($event).subscribe(data => {
      this.generaEstaciones(data);
    });
    this.camionesObs = this.db.collection('1').valueChanges();
    this.camionesObs.subscribe(res =>{
      this.camiones = res;

    });

  }

  generaPolylinea(puntos:any){
    this.geometria = [];
    for (let i = 0; i < puntos.length; i++) {
      this.geometria.push({lat:parseFloat(puntos[i][0]),lng:parseFloat(puntos[i][1])});

    }
  }

  generaEstaciones(data:any){
    this.estaciones = [];
    for (let i = 0; i < data.length; i++) {
      this.estaciones.push({nombre:data[i].nombre,lat:data[i].x,lng:data[i].y});
    }
  }

  colorRuta(ruta){
    switch (parseInt(ruta)) {
      case RUTA1:
        this.color = COLOR_RUTA1;
        break;

      case RUTA2:
        this.color = COLOR_RUTA2;
        break;

      case RUTA3:
        this.color = COLOR_RUTA3;
        break;

      case RUTA4:
        this.color = COLOR_RUTA4;
        break;

      case RUTA5:
        this.color = COLOR_RUTA5;
        break;

      case RUTA6:
        this.color = COLOR_RUTA6;
        break;

      case RUTA7:
        this.color = COLOR_RUTA7;
        break;

      case RUTA8:
        this.color = COLOR_RUTA8;
        break;

      case RUTA9:
        this.color = COLOR_RUTA9;
        break;

      case RUTA10:
        this.color = COLOR_RUTA10;
        break;

      case RUTA11:
        this.color = COLOR_RUTA11;
        break;

      case RUTA12:
        this.color = COLOR_RUTA12;
        break;

      case RUTA13:
        this.color = COLOR_RUTA13;
        break;
      case RUTA_BICIPUMA:
        this.color = COLOR_RUTA_BICIPUMA;
        break;
    }
  }

  obtieneEstacionesCercanas(){
    this._estacion.getEstacionesCercanas(this.lat,this.lng).subscribe(data => {
      this.generaEstaciones(data);
    });
  }

  obtieneEstacionamientos(){
    this._estacionamiento.getListEstacionamiento().subscribe(data => {
      this.estacionamientos = data;
    });
  }

  cambioEstacionamiento($event){
    this._estacionamiento.getEstacionamiento($event).subscribe(data => {
      let puntos = data[0].replace("POLYGON((","");
      puntos = puntos.replace("))","");
      puntos = puntos.split(",");
      for (let i = 0; i < puntos.length; i++) {
        puntos[i] =puntos[i].split(" ");
      }
      this.generaPolylinea(puntos);
    });


    this.lugaresEsta = this.db.doc('/estacionamiento/2/').valueChanges()
    this.lugaresEsta.subscribe(res =>{
      this.lugares = res;
    });

  }

}
