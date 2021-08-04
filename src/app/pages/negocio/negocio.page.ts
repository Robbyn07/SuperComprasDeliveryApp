import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../services/negocios.service';
import { Pedido } from '../../domain/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { PedidoDetalle } from '../../domain/pedidoDetalle';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {

  negocio:any;
  pedido:Pedido = new Pedido();
  pedidoDetalle:Array<PedidoDetalle> = new Array<PedidoDetalle>(); 
  zoom=16;

  constructor(private route: ActivatedRoute, private router:Router, private negociosService:NegociosService, private pedidoService:PedidoService) { 

    route.queryParams.subscribe(params =>{
      this.negocio = params.negocio
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.negocio = this.router.getCurrentNavigation().extras.queryParams.negocio;
      };
    })
  }

  ngOnInit() {
  }

  pedir(){
    this.pedido.id = this.pedidoService.generarId();
    this.pedido.idNegocio = this.negocio.id;
    this.pedido.nombreNegocio = this.negocio.nombre;
    this.pedido.idCliente = "nada we";
    this.pedido.nombreCliente = "el nombre, cuando exista";
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        pedidoDetalle:this.pedidoDetalle,
      }
    }
    this.router.navigate(["/pedido"],params)
  }

}
