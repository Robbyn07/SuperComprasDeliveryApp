import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { Chat } from '../../domain/chat';
import { ChatService } from '../../services/chat.service';
import { Plugins} from '@capacitor/core';
const { LocalNotifications } = Plugins;


@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  pedido:Pedido;
  pedidoDetalle:Array<PedidoDetalle>;
  negocio:any;

  chat: Chat = new Chat();

  pr:number;

  men={
    enviado:"",
    mensaje:""
  }


  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, 
        private negociosService:NegociosService, private chatService:ChatService) { 
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
    this.negocio = this.negociosService.getNegocio(this.pedido.idNegocio);
    this.pedido.estado = "Enviado";
    this.pedido.fecha = new Date();
    this.pedido.precioTotal = 0;
    this.pedidoDetalle.forEach((element,index)=>{
      this.pedido.precioTotal += element.precioTotal;
      this.pr = element.precioTotal;
    });
  }

  pedir(){
    this.enviarNotificacion();

    this.pedidoService.save(this.pedido);
    this.pedidoDetalle.forEach((element,index)=>{
      this.pedidoDetalleService.save(element);
    });

    this.chat.id = this.chatService.generarId();
    this.chat.idPedido = this.pedido.id;
    this.men.enviado = "empleado";
    this.men.mensaje = "He realizado un pedido"
    this.chat.mensajes.push(this.men);
    this.chatService.save(this.chat)

    //console.log("se realizo el pedido (se guardo en la base de datos)")
    //console.log(this.pedido.id);
    //console.log(this.pedido.negocio);
    let params: NavigationExtras = {
      queryParams:{
        id:this.pedido.id,
        idNegocio:this.pedido.idNegocio,
      }
    }
    this.router.navigate(["/pedido-seguimiento"],params)
  }

  enviarNotificacion(){
    LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'SuperCompras Delivery',
        body: 'Nuevo Pedido Creado',
        sound: null,
        attachments: null,
        actionTypeId: "",
        extra: null
      }]
      
    });
  }

}
