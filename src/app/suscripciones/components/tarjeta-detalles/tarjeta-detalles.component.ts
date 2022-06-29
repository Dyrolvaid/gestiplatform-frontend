import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Suscripcion} from "../../../shared/interfaces/suscripciones-por-persona.interface";

@Component({
  selector: 'app-tarjeta-detalles',
  templateUrl: './tarjeta-detalles.component.html',
  styleUrls: ['./tarjeta-detalles.component.css']
})
export class TarjetaDetallesComponent implements OnInit {

  public suscripcion?: Suscripcion;

  constructor(private _dynamicDialogConfig: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.suscripcion = this._dynamicDialogConfig.data.suscripcion;
  }

}
