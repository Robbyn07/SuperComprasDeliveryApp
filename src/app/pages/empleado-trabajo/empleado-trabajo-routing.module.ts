import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoTrabajoPage } from './empleado-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoTrabajoPageRoutingModule {}
