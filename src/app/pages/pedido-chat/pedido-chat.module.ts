import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoChatPageRoutingModule } from './pedido-chat-routing.module';

import { PedidoChatPage } from './pedido-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoChatPageRoutingModule
  ],
  declarations: [PedidoChatPage]
})
export class PedidoChatPageModule {}
