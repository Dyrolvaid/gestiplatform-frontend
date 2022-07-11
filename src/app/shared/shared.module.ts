import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ErrorComponent } from './components/error/error.component';
import {BarraProgresoComponent} from "./components/barra-progreso/barra-progreso.component";
import {PrimengModule} from "../primeng/primeng.module";
import { DateAsAgoPipe } from './pipes/date-as-ago.pipe';



@NgModule({
  declarations: [
    ErrorComponent,
    BarraProgresoComponent,
    DateAsAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule
  ],
    exports: [
        ErrorComponent,
        BarraProgresoComponent,
        DateAsAgoPipe
    ]
})
export class SharedModule { }
