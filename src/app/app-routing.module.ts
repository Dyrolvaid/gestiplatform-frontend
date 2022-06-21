import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'suscripciones',
    loadChildren: () => import('./suscripciones/suscripciones.module').then(m => m.SuscripcionesModule)
  },
  {
    path: 'personas',
    loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})









export class AppRoutingModule { }
