import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSuscripcionesComponent } from './pages/home-suscripciones/home-suscripciones.component';
import {SuscripcionesRoutingModule} from "./suscripciones-routing.module";
import { MenuComponent } from './components/menu/menu.component';
import {PrimengModule} from "../primeng/primeng.module";
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import {MomentModule} from "angular2-moment";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    HomeSuscripcionesComponent,
    MenuComponent,
    TarjetaComponent
  ],
  imports: [
    CommonModule,
    SuscripcionesRoutingModule,
    SharedModule,
    PrimengModule,
    MomentModule
  ]
})
export class SuscripcionesModule { }
