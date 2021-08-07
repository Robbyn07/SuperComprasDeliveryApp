import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { LocationService } from '../../services/location.service';
import { NegociosService } from '../../services/negocios.service';
import { AlertController } from '@ionic/angular';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../domain/chat';

@Component({
  selector: 'app-pedido-chat',
  templateUrl: './pedido-chat.page.html',
  styleUrls: ['./pedido-chat.page.scss'],
})
export class PedidoChatPage implements OnInit {
  
  id:string;
  idNegocio:string;

  chat: any;
  mensaje:string;

  men={
    enviado:"",
    mensaje:""
  }

  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, 
    private locationService:LocationService, private negociosService:NegociosService, private alertController:AlertController, private chatService:ChatService) { 
      route.queryParams.subscribe(params =>{
        this.id = params.id;
        this.idNegocio = params.idNegocio;
        if(this.router.getCurrentNavigation().extras.queryParams){
          this.id = this.router.getCurrentNavigation().extras.queryParams.id;
          this.idNegocio = this.router.getCurrentNavigation().extras.queryParams.idNegocio;
        };
      })
    }

  ngOnInit() {
    console.log(this.id)
    this.chat = this.chatService.getChat(this.id);
  }

  nuevoMensaje(c:Chat){
    this.men.enviado = "cliente";
    this.men.mensaje = this.mensaje
    c.mensajes.push(this.men);
    this.chatService.save(c);
    this.mensaje=""
  }


  regresar(){
    let params: NavigationExtras = {
      queryParams:{
        id:this.id,
        idNegocio:this.idNegocio,
      }
    }
    this.router.navigate(["/pedido-seguimiento"],params)
  }

}
