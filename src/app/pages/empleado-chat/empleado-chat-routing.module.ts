import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoChatPage } from './empleado-chat.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoChatPageRoutingModule {}
