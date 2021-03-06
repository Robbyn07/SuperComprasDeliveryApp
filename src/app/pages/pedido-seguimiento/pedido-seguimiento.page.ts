import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { LocationService } from '../../services/location.service';
import { NegociosService } from '../../services/negocios.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-pedido-seguimiento',
  templateUrl: './pedido-seguimiento.page.html',
  styleUrls: ['./pedido-seguimiento.page.scss'],
})
export class PedidoSeguimientoPage implements OnInit {
  
  id:string;
  idNegocio:string;
  
  //cambiar por el destino del cliente
  lat = -2.911221;
  lng = -79.057738;

  borrar:string;

  pedido:any;
  pedidoDetalle:any;
  negocio:any;

  zoom=16;

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, 
        private locationService:LocationService, private negociosService:NegociosService, private alertController:AlertController) { 

    route.queryParams.subscribe(params =>{
      this.id = params.id;
      this.idNegocio = params.idNegocio;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.id = this.router.getCurrentNavigation().extras.queryParams.id;
        this.idNegocio = this.router.getCurrentNavigation().extras.queryParams.idNegocio;
      };
    })
  }

  async ngOnInit() {
    //CUANDO EXISTA UN CLIENTE, SE DEBE OBTENER LA UBICACION DEL CLIENTE PARA LAS VARIABLES DE lat Y lng
    //console.log(this.id)
    //console.log(this.idNegocio)
    this.pedido = this.pedidoService.getPedido(this.id);
    this.pedidoDetalle = this.pedidoDetalleService.getDetalle(this.id);
    this.negocio = this.negociosService.getNegocio(this.idNegocio);
    //cuando exista un empleado, obtener la ubicacion del tipo

  }

  clickInicio(){
    this.router.navigate(["/folder/Index"])
  }

  click(url:string){
    let params: NavigationExtras = {
      queryParams:{
        url:"/folder/Index"
      }
    }
    this.router.navigate([url],params)
  }

  clickHistorial(url:string){
    let params: NavigationExtras = {
      queryParams:{
        url:"/folder/Index",
        id:this.id,
      }
    }
    this.router.navigate([url],params)
  }

  
  newAddress(event:any){
    /*if(event){
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;

      this.locationService.getAddressOfLocation(this.centerLocation);
      console.log(this.centerLocation);
    }*/
  }

  chat(){
    let params: NavigationExtras = {
      queryParams:{
        id:this.id,
        idNegocio:this.idNegocio,
      }
    }
    this.router.navigate(["/pedido-chat"],params)
  }

  borrarr(){
    console.log(this.borrar);
  }


}
