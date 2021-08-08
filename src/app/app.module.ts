import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFirestoreModule,
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
            })
          ],
  providers: [ LocalNotifications, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
