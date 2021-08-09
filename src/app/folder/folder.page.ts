import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from '../services/negocios.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

import { AutentificacionService } from 'src/app/services/autentificacion.service'; 

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  negocios: any;
  public folder: string;

  user2: any;
  verifica: any;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private negociosService:NegociosService, private auth: AutentificacionService) { }

  async ngOnInit() {

    this.verifica = await this.auth.verificacion();
    this.user2 = this.auth.getUsuario(this.verifica);
    this.user2.forEach((element: any[]) => {
      this.id = element[0].id;
    });


    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.negocios = this.negociosService.getNegocios();

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        console.log("Error" + result)
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );
    
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  
  }

  abrir(negocio:any){
    let params: NavigationExtras = {
      queryParams:{
        negocio:negocio,
      }
    }
    this.router.navigate(["/negocio"],params)
  }
  

  salirC(){
    console.log("Sale Cliente")
    this.auth.salirCuenta();
    this.router.navigate(["/login"])
  }


  clickInicio(){
    this.router.navigate(["/folder/Index"])
  }

  click(url:string){
    let params: NavigationExtras = {
      queryParams:{
        url:"/folder/Index"
      }
    }
    this.router.navigate([url],params)
  }

  clickHistorial(url:string){
    let params: NavigationExtras = {
      queryParams:{
        url:"/folder/Index",
        id:this.id,
      }
    }
    this.router.navigate([url],params)
  }

}
