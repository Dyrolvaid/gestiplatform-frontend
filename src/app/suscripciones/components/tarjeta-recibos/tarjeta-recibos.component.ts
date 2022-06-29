import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Recibo} from "../../../shared/interfaces/recibo.interface";
import {RecibosService} from "../../../shared/services/recibos.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";
import {Suscripcion} from "../../../shared/interfaces/suscripciones-por-persona.interface";

@Component({
  selector: 'app-tarjeta-recibos',
  templateUrl: './tarjeta-recibos.component.html',
  styleUrls: ['./tarjeta-recibos.component.css']
})
export class TarjetaRecibosComponent implements OnInit {

  public suscripcion?: Suscripcion;
  public estadoCargandoRecibos: boolean;
  public recibos?: Recibo[];

  constructor(private _dynamicDialogConfig: DynamicDialogConfig,
              private _recibosService: RecibosService,
              private _suscripcionesService: SuscripcionesService) {
    this.estadoCargandoRecibos = false;
  }

  ngOnInit(): void {
    this.suscripcion = this._suscripcionesService.suscripciones![this._dynamicDialogConfig.data.suscripcion.id - 1].suscripcion;
    this.estadoCargandoRecibos = true;
    this._recibosService.getRecibosPorSuscripcion(this.suscripcion!.id).subscribe({
      next: (resp) => {
        this.estadoCargandoRecibos = false;
        //console.log(JSON.stringify(resp));
        this.recibos = resp;
      },
      error: (error: HttpErrorResponse) => {
        this.estadoCargandoRecibos = false;
        console.error(error);
      }
    });
  }

}
