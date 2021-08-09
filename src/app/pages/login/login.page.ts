import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service'; 
import { Usuario } from 'src/app/domain/usuario';
import { AlertButton } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: Usuario = new Usuario();
  user2: any;
  verifica: any;
  alerta: any;

  constructor( private router: Router, private auth: AutentificacionService ) { }

  ngOnInit() {
  }

  async logeo(){
    //const { auth } = this
    try {
    console.log("1");
    const user = await this.auth.onLogin(this.user);

    //this.verifica = await this.auth.verificacion();
    //console.log("ver data", this.verifica);

    if(user){
      this.user2 = this.auth.getUsuario(this.user.email);
      this.user2.forEach((element: any[]) => {

        console.log(" VER ELEMENTO", element[0]);
        if(element[0].rol == "cliente"){
          console.log('USER CLIENTE NICE')
          this.router.navigate(["/folder/Inbox"])

        }else{
          console.log('USER EMPLEADO NICE')
          this.router.navigate(["/empleado-inicio"])
        }

      });

    }else{
      console.log("error en el loggeo")
      this.alerta = "Datos incorrectos"
    }
  } catch (error) {
      
  }
    
  }

  pagRegistro(){
    this.router.navigate(["/registro"])
  }

  googleLogin() {
    this.auth.googleLogin();
    this.router.navigate(["/folder/Inbox"])
  }

}
