import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeSuscripcionesComponent} from "./pages/home-suscripciones/home-suscripciones.component";
import {ErrorComponent} from "../shared/components/error/error.component";

const routes : Routes = [
  {
    path: '',
    children: [
      { path: 'suscripciones', component: HomeSuscripcionesComponent },
      { path: '**', component: ErrorComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscripcionesRoutingModule { }
