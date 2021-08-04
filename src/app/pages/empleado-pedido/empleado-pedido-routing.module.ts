import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoPedidoPage } from './empleado-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoPedidoPageRoutingModule {}
