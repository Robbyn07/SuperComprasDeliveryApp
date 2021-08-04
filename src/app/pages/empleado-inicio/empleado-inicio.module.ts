import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoInicioPageRoutingModule } from './empleado-inicio-routing.module';

import { EmpleadoInicioPage } from './empleado-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoInicioPageRoutingModule
  ],
  declarations: [EmpleadoInicioPage]
})
export class EmpleadoInicioPageModule {}
