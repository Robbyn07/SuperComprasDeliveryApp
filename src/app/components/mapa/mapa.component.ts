import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  map: any;
  address:string;
  lati: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  mapOptions: any;



  @Input() latEmp: string = "-2.911221";
  @Input() lonEmp: string = "-79.057738";
  @Input() latDes: string = "-2.911221";
  @Input() lonDes: string = "-79.057738";

  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.loadMap();
    this.startNavigating();
  }


  loadMap() {
    
    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.lati = (resp.coords.latitude).toString();
      this.long = (resp.coords.longitude).toString();
      this.mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
      
      //CUANDO TENEMOS LAS COORDENADAS SIMPLEMENTE NECESITAMOS PASAR AL MAPA DE GOOGLE TODOS LOS PARAMETROS.
      
     
      
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, this.mapOptions); 

  }


  startNavigating(){
    
    let directionsService = new google.maps.DirectionsService;
    
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsDisplay.setPanel(document.getElementById("directionsPanel") as HTMLElement);
    
    directionsService.route({
          origin: {lat: +this.latEmp, lng: +this.lonEmp},
          destination: {lat: +this.latDes, lng: +this.lonDes},
          travelMode: google.maps.TravelMode['DRIVING']
        }, 
    
        (res:any) => {
          
              directionsDisplay.setDirections(res);
              console.log(res);
              
          }
    );
    
  }

}
