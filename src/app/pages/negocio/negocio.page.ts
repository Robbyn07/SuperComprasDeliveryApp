import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../services/negocios.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {

  negocio:any;
  zoom=16;

  constructor(private route: ActivatedRoute, private router:Router, private negociosService:NegociosService) { 

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
    let params: NavigationExtras = {
      queryParams:{
        negocio:this.negocio,
      }
    }
    this.router.navigate(["/pedido"],params)
  }

}
