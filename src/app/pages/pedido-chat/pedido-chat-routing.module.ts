import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoChatPage } from './pedido-chat.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoChatPageRoutingModule {}
