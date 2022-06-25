import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSuscripcionesComponent } from './pages/home-suscripciones/home-suscripciones.component';
import {SuscripcionesRoutingModule} from "./suscripciones-routing.module";



@NgModule({
  declarations: [
    HomeSuscripcionesComponent
  ],
  imports: [
    CommonModule,
    SuscripcionesRoutingModule
  ]
})
export class SuscripcionesModule { }
