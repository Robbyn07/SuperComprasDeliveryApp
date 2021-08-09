import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-pedido-historial',
  templateUrl: './pedido-historial.page.html',
  styleUrls: ['./pedido-historial.page.scss'],
})
export class PedidoHistorialPage implements OnInit {

  pedidosFinalizado:any;
  pedidosEnviado:any;
  pedidosAceptado:any;
  pedidosEntregando:any;

  url:string;
  id:string;

  
  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, 
        private negociosService:NegociosService) { 
    route.queryParams.subscribe(params =>{
      this.url = params.url;
      this.id = params.id;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.url = this.router.getCurrentNavigation().extras.queryParams.url;
        this.id = this.router.getCurrentNavigation().extras.queryParams.id;
      };
    })
    
  }

  ngOnInit() {
    console.log(this.id)


    this.pedidosFinalizado = this.pedidoService.getPedidosFinalizadosCliente(this.id);
    this.pedidosEnviado = this.pedidoService.getPedidosEnviadoCliente(this.id);
    this.pedidosAceptado = this.pedidoService.getPedidosAceptadoCliente(this.id);
    this.pedidosEntregando = this.pedidoService.getPedidosEntregandoCliente(this.id);
  }

  ver(p:Pedido){
    let params: NavigationExtras = {
      queryParams:{
        id:p.id,
        idNegocio:p.idNegocio,
      }
    }
    this.router.navigate(["/pedido-seguimiento"],params)
  }

  regresar(){
    this.router.navigate([this.url])
  }

}
