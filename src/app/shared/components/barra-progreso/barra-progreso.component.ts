import { Component } from '@angular/core';
import {SuscripcionesService} from "../../services/suscripciones.service";

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrls: ['./barra-progreso.component.css'],
})
export class BarraProgresoComponent {
  constructor(public _suscripcionesService: SuscripcionesService ) {
  }
}
