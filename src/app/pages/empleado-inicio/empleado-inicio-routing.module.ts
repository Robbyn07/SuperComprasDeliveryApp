import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoInicioPage } from './empleado-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoInicioPageRoutingModule {}
