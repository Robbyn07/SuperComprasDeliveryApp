import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from '../services/negocios.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  negocios: any;
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private negociosService:NegociosService) { }

  async ngOnInit() {
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

  

}
