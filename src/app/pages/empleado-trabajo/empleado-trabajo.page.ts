import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { Negocio } from '../../domain/negocio';

@Component({
  selector: 'app-empleado-trabajo',
  templateUrl: './empleado-trabajo.page.html',
  styleUrls: ['./empleado-trabajo.page.scss'],
})
export class EmpleadoTrabajoPage implements OnInit {

  pedido:Pedido;
  idNegocio:string;
  idCliente:string;
  negocio:any;
  pedidoDetalle:any;

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService) { 
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


  cambioEstado(){
    //cambiar el pedido de estado de (Aceptado a Entregando) y de (Entregando a Finalizado)
    //y cambiar los datos del destino del pedido por la posicion del cliente
  }

}
