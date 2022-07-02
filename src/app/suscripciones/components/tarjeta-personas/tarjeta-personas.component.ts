import { Component, OnInit } from '@angular/core';
import {PersonasService} from "../../../shared/services/personas.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-tarjeta-personas',
  templateUrl: './tarjeta-personas.component.html',
  styleUrls: ['./tarjeta-personas.component.css']
})
export class TarjetaPersonasComponent implements OnInit {

  public grupo: Grupo;
  public cargando : boolean = false;
  public gruposConPersonasPorSuscripcion: Grupo[];

  constructor(private _personasService: PersonasService, private _dynamicDialogConfig : DynamicDialogConfig) {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.gruposConPersonasPorSuscripcion = [];
  }

  ngOnInit(): void {
    this.consultaGetPersonasByIdSuscripcion();
  }

  public consultaGetPersonasByIdSuscripcion(): void {
    this.cargando = true;
    this._personasService.getPersonasByIdSuscripcion(this.grupo.suscripcion.id).subscribe(
      {
        next: (resp) => {
          this.cargando = false;
          console.log('Respuesta personas:', resp);
          this.gruposConPersonasPorSuscripcion = resp;
        },
        error: (error : HttpErrorResponse) => {
          this.cargando = false;
          console.error("Error al consultar las personas:", error);
        }
      }
    );
  }
}
