import {Component, Input, OnInit} from '@angular/core';
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";
import localeES from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  @Input() indiceSuscripcion: number;

  // Cuadro de diálogo de editar suscripción
  public mostrar: boolean;


  constructor(public _suscripcionesService: SuscripcionesService) {
    this.indiceSuscripcion = 0;
    this.mostrar = false;
  }

  ngOnInit(): void {
    registerLocaleData(localeES);
  }

  public mostrarDialogoEditarSuscripcion() {
    this.mostrar = true;
  }

  public cerrarDialogoEditarSuscripcion() {
    this.mostrar = false;
  }




}
