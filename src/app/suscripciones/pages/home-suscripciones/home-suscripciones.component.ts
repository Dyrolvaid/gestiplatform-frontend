import { Component, OnInit } from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";

@Component({
  selector: 'app-home-suscripciones',
  templateUrl: './home-suscripciones.component.html',
  styleUrls: ['./home-suscripciones.component.css']
})
export class HomeSuscripcionesComponent implements OnInit {

  constructor(public gruposService: GruposService) {
    this.gruposService.cargarConjuntoGrupos();
  }

  ngOnInit(): void {
  }

}
