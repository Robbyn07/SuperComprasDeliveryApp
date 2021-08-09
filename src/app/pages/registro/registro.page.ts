import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutentificacionService } from 'src/app/services/autentificacion.service'; 
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user : Usuario = new Usuario();
  ID: any;
  lati:any;
  longi:any;

  constructor(private router: Router, private auth: AutentificacionService  ) { }

  ngOnInit() {
  }

  async registro(){
    

    const user = await this.auth.onRegistro(this.user);
    if(user){
      this.lati = "-2.872220";
      this.longi = "-78.974952";
      this.user.latitud = this.lati;
      this.user.longitud = this.longi;
      this.auth.save(this.user);
      //this.ID = this.auth.verificacion();
      
      //console.log(" ES EL ID (EMAL)",  this.ID)
      
      console.log("exito de registro ");
      //this.router.navigate(["/folder/Imbox"])
    }else{
      console.log("error en registro")
    }
  }

  regresar(){
    this.router.navigate(["/login"])
  }


}