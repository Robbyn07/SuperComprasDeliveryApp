import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaInfoPageRoutingModule } from './cuenta-info-routing.module';

import { CuentaInfoPage } from './cuenta-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaInfoPageRoutingModule
  ],
  declarations: [CuentaInfoPage]
})
export class CuentaInfoPageModule {}
