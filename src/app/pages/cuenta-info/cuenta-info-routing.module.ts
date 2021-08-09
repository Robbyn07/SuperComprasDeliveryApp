import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaInfoPage } from './cuenta-info.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaInfoPageRoutingModule {}
