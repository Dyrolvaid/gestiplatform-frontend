import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ErrorComponent } from './components/error/error.component';
import {BarraProgresoComponent} from "./components/barra-progreso/barra-progreso.component";
import {PrimengModule} from "../primeng/primeng.module";



@NgModule({
  declarations: [
    ErrorComponent,
    BarraProgresoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimengModule
  ],
  exports: [
    ErrorComponent,
    BarraProgresoComponent
  ]
})
export class SharedModule { }
