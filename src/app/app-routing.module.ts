import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'tabs/tab1',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
