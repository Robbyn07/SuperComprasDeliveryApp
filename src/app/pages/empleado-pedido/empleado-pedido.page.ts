import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoDetalle } from '../../domain/pedidoDetalle';
import { PedidoService } from '../../services/pedido.service';
import { PedidoDetalleService } from '../../services/pedido-detalle.service';
import { NegociosService } from '../../services/negocios.service';
import { Negocio } from '../../domain/negocio';
import { AutentificacionService } from '../../services/autentificacion.service';

@Component({
  selector: 'app-empleado-pedido',
  templateUrl: './empleado-pedido.page.html',
  styleUrls: ['./empleado-pedido.page.scss'],
})
export class EmpleadoPedidoPage implements OnInit {

  pedido:Pedido;
  idNegocio:string;
  idCliente:string;
  negocio:any;
  pedidoDetalle:any;

  user2: any;
  verifica: any;

  nombreEmp:string;
  idEmp:string;
  constructor(private route: ActivatedRoute, private router:Router, private pedidoDetalleService:PedidoDetalleService, private pedidoService:PedidoService, private negociosService:NegociosService, private auth: AutentificacionService) { 
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

  async ngOnInit() {
    this.negocio = this.negociosService.getNegocio(this.idNegocio);
    this.pedidoDetalle = this.pedidoDetalleService.getDetalle(this.pedido.id);

    this.verifica = await this.auth.verificacion();
    this.user2 = this.auth.getUsuario(this.verifica);
    this.user2.forEach((element: any[]) => {
      this.idEmp = element[0].id;
      this.nombreEmp = element[0].nombre;

    });
  }

  confirmar(){
    this.pedido.idEmpleado = this.idEmp;
    this.pedido.nombreEmpleado = this.nombreEmp;

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
