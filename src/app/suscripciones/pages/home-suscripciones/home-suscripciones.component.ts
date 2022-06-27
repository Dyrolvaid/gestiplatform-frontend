import { Component, OnInit } from '@angular/core';
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";

@Component({
  selector: 'app-home-suscripciones',
  templateUrl: './home-suscripciones.component.html',
  styleUrls: ['./home-suscripciones.component.css']
})
export class HomeSuscripcionesComponent implements OnInit {

  constructor(public _suscripcionesService: SuscripcionesService) {
    this._suscripcionesService.cargarConjuntoSuscripciones();
  }

  ngOnInit(): void {
  }

}
