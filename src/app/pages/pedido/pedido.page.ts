import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { CategoriaService } from '../../services/categoria.service';
import { PedidoService } from '../../services/pedido.service';
import { Categoria } from '../../domain/categoria';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  pedido:Pedido;
  pedidoDetalle:Array<PedidoDetalle>;
  categorias:any;
  id:string;

  constructor(private route: ActivatedRoute, private router:Router, private categoriaService:CategoriaService, private pedidoService:PedidoService) { 

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
    this.categorias = this.categoriaService.getCategorias();
  }

  verCategoria(c:any){

    let params: NavigationExtras = {
      queryParams:{
        categoria:c,
        pedido:this.pedido,
        pedidoDetalle:this.pedidoDetalle,
      }
    }
    this.router.navigate(["/producto"],params)
  }

  pedir(){
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        pedidoDetalle:this.pedidoDetalle,
      }
    }
    this.router.navigate(["/detalle-pedido"],params)
  }

}
