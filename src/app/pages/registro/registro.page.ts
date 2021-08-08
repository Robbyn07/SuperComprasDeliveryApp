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

  constructor(private router: Router, private auth: AutentificacionService  ) { }

  ngOnInit() {
  }

  async registro(){
    const user = await this.auth.onRegistro(this.user);
    if(user){
      this.ID = this.auth.verificacion();
      console.log(" ES EL ID (EMAL)",  this.ID)
      this.auth.save(this.user);
      console.log("exito de registro ");
      this.router.navigate(["/folder/Imbox"])
    }else{
      console.log("error en registro")
    }
  }

  regresar(){
    this.router.navigate(["/login"])
  }


}