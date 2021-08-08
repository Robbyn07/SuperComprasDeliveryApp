import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service'; 
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: Usuario = new Usuario();
  user2: any;
  verifica: any;

  rol: any;
  no: boolean;

  constructor( private router: Router, private auth: AutentificacionService ) { }

  ngOnInit() {
  }

  async logeo(){
    console.log("1");
    const user = await this.auth.onLogin(this.user);
    
    //console.log("2   ", this.verifica);
    if(user){
      this.user2 = this.auth.getUsuario(this.user.email);
      this.auth.NO(this.user2);
      if(!this.auth.NO(this.user2)){
        this.router.navigate(["/folder/Inbox"])
      }else{
        this.router.navigate(["/empleado-inicio"])
      }

      /*
      console.log("exito login")
      console.log("ver email " , this.user.email);
      this.verifica = this.auth.verificacion();
      console.log("ver email 2  "  , this.verifica);

      this.user2 = this.auth.getUsuario(this.user.email);
      console.log(this.user2.length)

      for (let index = 0; index <= this.user2.length; index++) {
         this.rol = this.user2.rol;
        console.log("ver ROL : " , this.rol);
      }


      console.log("valores de user2  " ,  this.user2 );
      if(this.user2.rol == "cliente"){
        console.log("detecta cliente");
        this.router.navigate(["/folder/Inbox"])
      }else{
        this.router.navigate(["/empleado-inicio"])
      }
      */
    }else{
      console.log("error en el loggeo")
    }
    
  }

  pagRegistro(){
    this.router.navigate(["/registro"])
  }

}
