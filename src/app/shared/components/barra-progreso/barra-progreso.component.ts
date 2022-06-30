import { Component } from '@angular/core';
import {GruposService} from "../../services/grupos.service";

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrls: ['./barra-progreso.component.css'],
})
export class BarraProgresoComponent {
  constructor(public _suscripcionesService: GruposService ) {
  }
}
