import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoSeguimientoPageRoutingModule } from './pedido-seguimiento-routing.module';

import { PedidoSeguimientoPage } from './pedido-seguimiento.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoSeguimientoPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
    })
  ],
  declarations: [PedidoSeguimientoPage]
})
export class PedidoSeguimientoPageModule {}
