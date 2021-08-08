import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';

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
  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService) { }

  ngOnInit() {
    this.pedidosFinalizado = this.pedidoService.getPedidosFinalizadosCliente("nada we");
    this.pedidosEnviado = this.pedidoService.getPedidosEnviadoCliente("nada we");
    this.pedidosAceptado = this.pedidoService.getPedidosAceptadoCliente("nada we");
    this.pedidosEntregando = this.pedidoService.getPedidosEntregandoCliente("nada we");
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


}
