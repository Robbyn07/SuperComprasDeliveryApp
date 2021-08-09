import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { Negocio } from '../../domain/negocio';
import { AutentificacionService } from '../../services/autentificacion.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-empleado-trabajo',
  templateUrl: './empleado-trabajo.page.html',
  styleUrls: ['./empleado-trabajo.page.scss'],
})
export class EmpleadoTrabajoPage implements OnInit {

  pedido:Pedido;
  pedidoActualizarUbicacion:Pedido = new Pedido();
  pedidoBueno:any;
  idNegocio:string;
  idCliente:string;
  negocio:any;
  pedidoDetalle:any;

  cliente:any;


  lon:number;
  lat:number;

  currentLocation:any;

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, 
        private negociosService:NegociosService, private auth: AutentificacionService, private locationService:LocationService) { 
    route.queryParams.subscribe(params =>{
      this.pedido = params.pedido;
      this.idNegocio = params.idNegocio;
      this.idCliente = params.idCliente;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
        this.idNegocio = this.router.getCurrentNavigation().extras.queryParams.idNegocio;
        this.idCliente = this.router.getCurrentNavigation().extras.queryParams.idCliente;
      };
    })
  }

  ngOnInit() {
    this.negocio = this.negociosService.getNegocio(this.idNegocio);
    this.pedidoDetalle = this.pedidoDetalleService.getDetalle(this.pedido.id);
    this.pedidoBueno = this.pedidoService.getPedido(this.pedido.id);

    this.cliente = this.auth.getUsuarioId(this.pedido.idCliente);
    this.cliente.forEach((element: any[]) => {
      this.lat = element[0].latitud;
      this.lon = element[0].longitud;
    });


    this.pedidoBueno.forEach((element: any[]) => {
      this.pedidoActualizarUbicacion.id = element[0].id;
      this.pedidoActualizarUbicacion.precioTotal = element[0].precioTotal;
      this.pedidoActualizarUbicacion.fecha = element[0].fecha;
      this.pedidoActualizarUbicacion.idNegocio = element[0].idNegocio;
      this.pedidoActualizarUbicacion.nombreNegocio = element[0].nombreNegocio;
      this.pedidoActualizarUbicacion.estado = element[0].estado;
      this.pedidoActualizarUbicacion.idCliente = element[0].idCliente;
      this.pedidoActualizarUbicacion.nombreCliente = element[0].nombreCliente;
      this.pedidoActualizarUbicacion.lonEmp = element[0].lonEmp;
      this.pedidoActualizarUbicacion.latEmp = element[0].latEmp;
      this.pedidoActualizarUbicacion.lonDes = element[0].lonDes;
      this.pedidoActualizarUbicacion.latDes = element[0].latDes;
      this.pedidoActualizarUbicacion.metodoPago = element[0].metodoPago;
      this.pedidoActualizarUbicacion.nombreEmpleado = element[0].nombreEmpleado;
      this.pedidoActualizarUbicacion.idEmpleado = element[0].idEmpleado;
    });

    this.actual();



  }

  async actual(){
    this.currentLocation = await this.locationService.getCurrentLocation();

    this.pedidoActualizarUbicacion.latEmp = this.currentLocation.latitude;
    this.pedidoActualizarUbicacion.lonEmp = this.currentLocation.longitude;

    this.pedidoService.save(this.pedidoActualizarUbicacion);
  }

  chat(){
    this.pedido.estado = "Aceptado";
    this.pedidoService.save(this.pedido);
    
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        idNegocio:this.idNegocio,
        ipCliente:this.idCliente,
      }
    }
    this.router.navigate(["/empleado-chat"],params)
  }

  actualizarCheck(pd: PedidoDetalle){
    if (pd.booleanCompra){
      pd.booleanCompra = true;
      pd.estadoCompra = "Comprado";
    } else{
      pd.booleanCompra = false;
      pd.estadoCompra = "No comprado";
    }
    
    this.pedidoDetalleService.save(pd);
  }

  cambioEstado(p:Pedido){
    if(p.estado=="Aceptado" || p.estado=="aceptado"){
      p.estado = "Entregando";

      p.latDes = this.lat;
      p.lonDes = this.lon;

      //esto cambiar por la lon y lat del cliente
      //p.latDes = -2.920172; 
      //p.lonDes = -79.030588;
      this.pedidoService.save(p);
    }else if(p.estado=="Entregando" || p.estado=="Entregando"){
      p.estado = "Finalizado";
      this.pedidoService.save(p);// y salir
      
      this.router.navigate(["/empleado-inicio"])
    }

    //cambiar el pedido de estado de (Aceptado a Entregando) y de (Entregando a Finalizado)
    //y cambiar los datos del destino del pedido por la posicion del cliente
  }

}
