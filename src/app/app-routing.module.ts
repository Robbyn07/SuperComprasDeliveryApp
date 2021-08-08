import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'negocio',
    loadChildren: () => import('./pages/negocio/negocio.module').then( m => m.NegocioPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./pages/detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'pedido-seguimiento',
    loadChildren: () => import('./pages/pedido-seguimiento/pedido-seguimiento.module').then( m => m.PedidoSeguimientoPageModule)
  },
  {
    path: 'empleado-inicio',
    loadChildren: () => import('./pages/empleado-inicio/empleado-inicio.module').then( m => m.EmpleadoInicioPageModule)
  },
  {
    path: 'empleado-pedido',
    loadChildren: () => import('./pages/empleado-pedido/empleado-pedido.module').then( m => m.EmpleadoPedidoPageModule)
  },
  {
    path: 'empleado-trabajo',
    loadChildren: () => import('./pages/empleado-trabajo/empleado-trabajo.module').then( m => m.EmpleadoTrabajoPageModule)
  },
  {
    path: 'empleado-chat',
    loadChildren: () => import('./pages/empleado-chat/empleado-chat.module').then( m => m.EmpleadoChatPageModule)
  },
  {
    path: 'pedido-chat',
    loadChildren: () => import('./pages/pedido-chat/pedido-chat.module').then( m => m.PedidoChatPageModule)
  },
  {
    path: 'pedido-historial',
    loadChildren: () => import('./pages/pedido-historial/pedido-historial.module').then( m => m.PedidoHistorialPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
