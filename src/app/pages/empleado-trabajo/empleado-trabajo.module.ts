import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoTrabajoPageRoutingModule } from './empleado-trabajo-routing.module';

import { EmpleadoTrabajoPage } from './empleado-trabajo.page';
import { MapaComponent } from '../../components/mapa/mapa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoTrabajoPageRoutingModule
  ],
  declarations: [EmpleadoTrabajoPage, MapaComponent]
})
export class EmpleadoTrabajoPageModule {}
