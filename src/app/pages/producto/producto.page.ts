import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { ProductoService } from '../../services/producto.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { Categoria } from '../../domain/categoria';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { NegociosService } from '../../services/negocios.service';
import { Negocio } from '../../domain/negocio';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  categoria:any;
  pedido:Pedido;
  pedidoDetalle:Array<PedidoDetalle>;
  productos:any;
  detalle:PedidoDetalle;
  negocio:Negocio;

  constructor(private route: ActivatedRoute, private router:Router,private negociosService:NegociosService, private productoService:ProductoService, private pedidoDetalleService:PedidoDetalleService) { 
    route.queryParams.subscribe(params =>{
      this.negocio = params.negocio;
      this.categoria = params.categoria;
      this.pedido = params.pedido;
      this.pedidoDetalle = params.pedidoDetalle;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.negocio = this.router.getCurrentNavigation().extras.queryParams.negocio;
        this.categoria = this.router.getCurrentNavigation().extras.queryParams.categoria;
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
        this.pedidoDetalle = this.router.getCurrentNavigation().extras.queryParams.pedidoDetalle;
      };
    })
  }

  ngOnInit() {
    this.productos = this.productoService.getProductosCategoria(this.categoria.id);
  }

  menos(p:any){
    this.detalle = new PedidoDetalle();
    this.detalle.id = this.pedidoDetalleService.generarId();
    if(p.cantidad>0){
      p.cantidad = p.cantidad-1;
    }
    

    if(p.cantidad > 0){
      this.detalle.cantidad = p.cantidad;
      this.detalle.idProducto = p.id;
      this.detalle.idPedido = this.pedido.id;
      this.detalle.precio = p.precio;
      this.detalle.producto = p.nombre;
      this.detalle.precioTotal = p.cantidad*p.precio;
      this.detalle.idPedido = this.pedido.id;
      this.detalle.estadoCompra = "No comprado";
      this.detalle.booleanCompra = false;

      this.pedidoDetalle.forEach((element,index)=>{
        if(element.producto==this.detalle.producto) this.pedidoDetalle.splice(index,1);
      });

      this.pedidoDetalle.push(this.detalle);
    }else{
      this.pedidoDetalle.forEach((element,index)=>{
        if(element.producto==p.nombre) this.pedidoDetalle.splice(index,1);
      });
    }
    //console.log(this.pedidoDetalle.length)
    
  }

  mas(p:any){
    this.detalle = new PedidoDetalle();
    this.detalle.id = this.pedidoDetalleService.generarId();
    p.cantidad = p.cantidad+1;

    this.detalle.cantidad = p.cantidad;
    this.detalle.idProducto = p.id;
    this.detalle.precio = p.precio;
    this.detalle.producto = p.nombre;
    this.detalle.precioTotal = p.cantidad*p.precio;
    this.detalle.idPedido = this.pedido.id;
    this.detalle.estadoCompra = "No comprado";
    this.detalle.booleanCompra = false;

    this.pedidoDetalle.forEach((element,index)=>{
      if(element.producto==this.detalle.producto) this.pedidoDetalle.splice(index,1);
    });

    this.pedidoDetalle.push(this.detalle);
    //console.log(this.pedidoDetalle.length)

  }

  confirmar(){
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        pedidoDetalle:this.pedidoDetalle,
      }
    }
    this.router.navigate(["/pedido"],params)
  }


}
