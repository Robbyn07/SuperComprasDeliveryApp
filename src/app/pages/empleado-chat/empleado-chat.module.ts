import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoChatPageRoutingModule } from './empleado-chat-routing.module';

import { EmpleadoChatPage } from './empleado-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoChatPageRoutingModule
  ],
  declarations: [EmpleadoChatPage]
})
export class EmpleadoChatPageModule {}
