import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';



@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  pedido:Pedido;
  pedidoDetalle:Array<PedidoDetalle>;
  negocio:any;

  pr:number;


  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService) { 
    route.queryParams.subscribe(params =>{
      this.pedido = params.pedido;
      this.pedidoDetalle = params.pedidoDetalle;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
        this.pedidoDetalle = this.router.getCurrentNavigation().extras.queryParams.pedidoDetalle;
      };
    })
  }

  ngOnInit() {
    this.negocio = this.negociosService.getNegocio(this.pedido.negocio);
    this.pedido.estado = "enviado";
    this.pedido.fecha = new Date();
    this.pedido.precioTotal = 0;
    this.pedidoDetalle.forEach((element,index)=>{
      this.pedido.precioTotal += element.precioTotal;
      this.pr = element.precioTotal;
    });
  }

  pedir(){
    this.pedidoService.save(this.pedido);
    this.pedidoDetalle.forEach((element,index)=>{
      this.pedidoDetalleService.save(element);
    });
    console.log("se realizo el pedido (se guardo en la base de datos)")
  }

}
