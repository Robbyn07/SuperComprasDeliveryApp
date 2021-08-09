import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../domain/chat';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-empleado-chat',
  templateUrl: './empleado-chat.page.html',
  styleUrls: ['./empleado-chat.page.scss'],
})
export class EmpleadoChatPage implements OnInit {

  pedido:Pedido;
  idNegocio:string;
  idCliente:string;

  chat: any;
  mensaje:string;

  men={
    enviado:"",
    mensaje:""
  }

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService, private chatService:ChatService) { 
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
    this.chat = this.chatService.getChat(this.pedido.id);
  }

  nuevoMensaje(c:Chat){
    this.men.enviado = "empleado";
    this.men.mensaje = this.mensaje
    c.mensajes.push(this.men);
    this.chatService.save(c);
    this.mensaje=""
  }

  regresar(){
    this.pedido.estado = "Aceptado";
    this.pedidoService.save(this.pedido);
    
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        idNegocio:this.idNegocio,
        ipCliente:this.idCliente,
      }
    }
    this.router.navigate(["/empleado-trabajo"],params)
  }

}
