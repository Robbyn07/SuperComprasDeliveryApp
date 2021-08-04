import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoSeguimientoPage } from './pedido-seguimiento.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoSeguimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoSeguimientoPageRoutingModule {}
