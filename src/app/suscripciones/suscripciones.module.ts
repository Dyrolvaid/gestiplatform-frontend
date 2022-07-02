import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSuscripcionesComponent } from './pages/home-suscripciones/home-suscripciones.component';
import {SuscripcionesRoutingModule} from "./suscripciones-routing.module";
import { MenuComponent } from './components/menu/menu.component';
import {PrimengModule} from "../primeng/primeng.module";
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import {MomentModule} from "angular2-moment";
import {SharedModule} from "../shared/shared.module";
import { TarjetaDetallesComponent } from './components/tarjeta-detalles/tarjeta-detalles.component';
import { TarjetaPersonasComponent } from './components/tarjeta-personas/tarjeta-personas.component';
import { TarjetaRecibosComponent } from './components/tarjeta-recibos/tarjeta-recibos.component';
import {FormsModule} from "@angular/forms";
import {TabViewModule} from "primeng/tabview";



@NgModule({
  declarations: [
    HomeSuscripcionesComponent,
    MenuComponent,
    TarjetaComponent,
    TarjetaDetallesComponent,
    TarjetaPersonasComponent,
    TarjetaRecibosComponent
  ],
  imports: [
    CommonModule,
    SuscripcionesRoutingModule,
    SharedModule,
    PrimengModule,
    MomentModule,
    FormsModule,
    TabViewModule
  ]
})
export class SuscripcionesModule { }
