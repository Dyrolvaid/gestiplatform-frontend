import {Component, Input, OnInit} from '@angular/core';
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  @Input() indiceSuscripcion: number;

  constructor(public _suscripcionesService: SuscripcionesService) {
    this.indiceSuscripcion = 0;
  }

  ngOnInit(): void {
  }

}
