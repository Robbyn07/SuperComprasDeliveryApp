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
    this.pedido.lonEmp = -79.057738;
    this.pedido.latEmp = -2.911221;
    this.pedido.lonDes = this.negocio.longitud;
    this.pedido.latDes = this.negocio.latitud;
    let params: NavigationExtras = {
      queryParams:{
        negocio:this.negocio,
        pedido:this.pedido,
        pedidoDetalle:this.pedidoDetalle,
      }
    }
    this.router.navigate(["/pedido"],params)
  }

}
