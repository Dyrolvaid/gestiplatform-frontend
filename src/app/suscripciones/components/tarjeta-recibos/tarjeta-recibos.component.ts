import { Component, OnInit } from '@angular/core';
import {RecibosService} from "../../../shared/services/recibos.service";
import {Recibo} from "../../../shared/interfaces/recibo.interface";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";

@Component({
  selector: 'app-tarjeta-recibos',
  templateUrl: './tarjeta-recibos.component.html',
  styleUrls: ['./tarjeta-recibos.component.css']
})
export class TarjetaRecibosComponent implements OnInit {

  public listaRecibos: Recibo[];
  public grupo: Grupo;
  public estadoCargando: boolean;
  public listaGrupos: Grupo[];
  public listaGruposFiltrada: Grupo[];

  constructor(private _recibosService: RecibosService,
              private _dynamicDialogConfig: DynamicDialogConfig) {
    this.listaRecibos = [];
    this.grupo = <Grupo>{};
    this.estadoCargando = false;
    this.listaGrupos = [];
    this.listaGruposFiltrada = [];
  }

  ngOnInit(): void {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.estadoCargando = true;
    this.consultaGetRecibosByGrupo();
    this.consultaGetGrupoByPersona();
  }

  public consultaGetRecibosByGrupo(): void {
    if (this.grupo.id) {
      this._recibosService.getRecibosByGrupo(this.grupo.id).subscribe({
        next: (resp: Recibo[]) => {
          console.log('Recibos:', resp);
          this.estadoCargando = false;
          this.listaRecibos = resp;
        },
        error: (error) => {
          console.error('Recibos:', error);
          this.estadoCargando = false;
        }
    });
    }
  }

  public consultaGetGrupoByPersona(): void {
    if (this.grupo.id) {
      this._recibosService.getGrupoByPersona().subscribe({
        next: (resp: Grupo[]) => {
          console.log('Grupos:', resp);
          this.estadoCargando = false;
          this.listaGrupos = resp;
          this.listaGruposFiltrada = this.filtrarGruposBySuscripcion(this.grupo, this.listaGrupos);
        },
        error: (error) => {
          console.error('Grupos:', error);
          this.estadoCargando = false;
        }
      });
    }
  }

  public filtrarGruposBySuscripcion(grupo: Grupo, listaGrupos: Grupo[]): Grupo[] {
    let listaGruposFiltrada = [];
    for (let i = 0; i < listaGrupos.length; i++) {
      if (grupo.suscripcion.id === listaGrupos[i].suscripcion.id) {
        listaGruposFiltrada.push(listaGrupos[i]);
      }
    }
    console.log("filtro",listaGruposFiltrada);
    return listaGruposFiltrada;
  }
}
