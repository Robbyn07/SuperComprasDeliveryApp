import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { Negocio } from '../../domain/negocio';

@Component({
  selector: 'app-empleado-pedido',
  templateUrl: './empleado-pedido.page.html',
  styleUrls: ['./empleado-pedido.page.scss'],
})
export class EmpleadoPedidoPage implements OnInit {

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

  confirmar(){
    this.pedido.estado = "aceptado";
    this.pedidoService.save(this.pedido);
    //llamar a otra ventana
  }

}
