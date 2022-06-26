import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSuscripcionesComponent } from './pages/home-suscripciones/home-suscripciones.component';
import {SuscripcionesRoutingModule} from "./suscripciones-routing.module";
import { MenuComponent } from './components/menu/menu.component';
import {PrimengModule} from "../primeng/primeng.module";



@NgModule({
  declarations: [
    HomeSuscripcionesComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SuscripcionesRoutingModule,
    PrimengModule
  ]
})
export class SuscripcionesModule { }
