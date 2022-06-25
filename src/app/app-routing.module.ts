import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";
import {ErrorComponent} from "./shared/components/error/error.component";

const routes: Routes = [
  {
    path:'', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./suscripciones/suscripciones.module').then(m => m.SuscripcionesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'personas',
    loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  { path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
