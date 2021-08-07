import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoTrabajoPageRoutingModule } from './empleado-trabajo-routing.module';

import { EmpleadoTrabajoPage } from './empleado-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoTrabajoPageRoutingModule
  ],
  declarations: [EmpleadoTrabajoPage]
})
export class EmpleadoTrabajoPageModule {}
