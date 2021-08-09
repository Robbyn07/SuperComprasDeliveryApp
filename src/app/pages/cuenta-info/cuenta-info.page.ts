import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { AutentificacionService } from 'src/app/services/autentificacion.service'; 
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-cuenta-info',
  templateUrl: './cuenta-info.page.html',
  styleUrls: ['./cuenta-info.page.scss'],
})
export class CuentaInfoPage implements OnInit {

  user2: any;
  verifica: any;
  nom: any;
  dir: any;
  corr: any;
  pass: any;

  url:string;

  constructor(private auth: AutentificacionService, private route: ActivatedRoute, private router:Router) { 
    route.queryParams.subscribe(params =>{
      this.url = params.url;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.url = this.router.getCurrentNavigation().extras.queryParams.url;
      };
    })
  }

  async ngOnInit() {

    console.log(" ONE ");
    this.verifica = await this.auth.verificacion();
    console.log("TWO " , this.verifica);
    this.user2 = this.auth.getUsuario(this.verifica);

    this.user2.forEach((element: any[]) => {

      console.log(" VER ELEMENTO", element[0]);
      this.nom = element[0].nombre;
      this.dir = element[0].direccion;
      this.corr = element[0].email;
      this.pass = element[0].password;

    });

    
  }

  regresar(){
    this.router.navigate([this.url])
  }


}
