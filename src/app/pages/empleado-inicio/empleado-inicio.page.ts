import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';

import { AutentificacionService } from 'src/app/services/autentificacion.service'; 


@Component({
  selector: 'app-empleado-inicio',
  templateUrl: './empleado-inicio.page.html',
  styleUrls: ['./empleado-inicio.page.scss'],
})
export class EmpleadoInicioPage implements OnInit {

  pedidos:any;

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService, private auth: AutentificacionService ) { }

  ngOnInit() {
    this.pedidos = this.pedidoService.getPedidosEnviados();
  }  

  abrir(p:Pedido){
    let params: NavigationExtras = {
      queryParams:{
        pedido:p,
        idNegocio:p.idNegocio,
        ipCliente:p.idCliente,
      }
    }
    this.router.navigate(["/empleado-pedido"],params)
  }

  salirE(){
    console.log("Sale Empleado");
    this.auth.salirCuenta();
    this.router.navigate(["/login"])

  }

}
