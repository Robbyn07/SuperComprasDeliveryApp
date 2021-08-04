import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoPedidoPageRoutingModule } from './empleado-pedido-routing.module';

import { EmpleadoPedidoPage } from './empleado-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoPedidoPageRoutingModule
  ],
  declarations: [EmpleadoPedidoPage]
})
export class EmpleadoPedidoPageModule {}
