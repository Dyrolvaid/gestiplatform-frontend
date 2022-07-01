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

  public estadoCargando: boolean;
  public listaRecibosByGrupo: Recibo[];
  public listaRecibosBySuscripcionId: Recibo[];
  // public listaRecibosFiltrada: Recibo[];
  public grupo: Grupo;
  public listaGrupos: Grupo[];
  public contadorPersonas: number;
  // public listaGruposFiltrada: Grupo[];
  // public listaPersonas: Persona[];

  constructor(private _recibosService: RecibosService,
              private _dynamicDialogConfig: DynamicDialogConfig) {
    this.estadoCargando = false;
    // this.recibo = <Recibo>{};
    this.listaRecibosByGrupo = [];
    this.listaRecibosBySuscripcionId = [];
    // this.listaRecibosFiltrada = [];
    this.grupo = <Grupo>{};
    this.listaGrupos = [];
    // this.listaGruposFiltrada = [];
    this.contadorPersonas = 0;
    // this.listaPersonas = [];
  }

  ngOnInit(): void {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.estadoCargando = true;
    this.consultaGetRecibosByGrupo();
    this.consultaGetRecibosBySuscripcionId();
    // this.consultaGetGrupoByPersona();
    this.consultaGetGruposBySuscripcionId();
    this.contarPersonasByGrupo();
  }

  public contarPersonasByGrupo(): void {
    for (let i = 0; i < this.listaRecibosBySuscripcionId.length; i++){
      if (this.listaGrupos[i].persona.id === this.listaRecibosBySuscripcionId[i].grupo.persona.id) {
        this.contadorPersonas = this.contadorPersonas + 1;
      }
    }
  }

  public consultaGetRecibosByGrupo(): void {
    if (this.grupo.id) {
      this._recibosService.getRecibosByGrupo(this.grupo.id).subscribe({
        next: (resp: Recibo[]) => {
          console.log('RecibosByGrupo:', resp);
          this.estadoCargando = false;
          this.listaRecibosByGrupo = resp;
        },
        error: (error) => {
          console.error('RecibosByGrupo:', error);
          this.estadoCargando = false;
        }
    });
    }
  }

  public consultaGetRecibosBySuscripcionId(): void {
    if (this.grupo.id) {
      this._recibosService.getRecibosBySuscripcionId(this.grupo.suscripcion.id).subscribe({
        next: (resp: Recibo[]) => {
          console.log('RecibosBySuscripcionId recibidos:', resp);
          this.estadoCargando = false;
          this.listaRecibosBySuscripcionId = resp;
        },
        error: (error) => {
          console.error('RecibosBySuscripcionId erróneos:', error);
          this.estadoCargando = false;
        }
      });
    }
  }

  public consultaGetGruposBySuscripcionId(): void {
    if(this.grupo.suscripcion.id){
      this._recibosService.getGruposBySuscripcionId(this.grupo.suscripcion.id).subscribe({
        next: (resp: Grupo[]) => {
          console.log('GruposBySuscripcionId recibidos:', resp);
          this.estadoCargando = false;
          this.listaGrupos = resp;
        },
        error: (error) => {
          console.error('GruposBySuscripcionId erróneos:', error);
          this.estadoCargando = false;
        }
      });
    }
  }

  // public consultaGetGrupoByPersona(): void {
  //   if (this.grupo.id) {
  //     this._recibosService.getGrupoByPersona().subscribe({
  //       next: (resp: Grupo[]) => {
  //         console.log('Grupos:', resp);
  //         this.estadoCargando = false;
  //         this.listaGrupos = resp;
  //         // this.filtrarDefinitivo();
  //       },
  //       error: (error) => {
  //         console.error('Grupos:', error);
  //         this.estadoCargando = false;
  //       }
  //     });
  //   }
  // }

  // public filtrarGruposBySuscripcion(grupo: Grupo, listaGrupos: Grupo[]): Grupo[] {
  //   let listaGruposFiltrada: Grupo[] = [];
  //   for (let i = 0; i < listaGrupos.length; i++) {
  //     if (grupo.suscripcion.id === listaGrupos[i].suscripcion.id) {
  //       listaGruposFiltrada.push(listaGrupos[i]);
  //     }
  //   }
  //   console.log("filtro",listaGruposFiltrada);
  //   return listaGruposFiltrada;
  // }

  // public filtrarRecibosByPersona(listaRecibosByGrupo: Recibo[], persona: Persona): Recibo[] {
  //   let listaRecibosFiltrada: Recibo[] = [];
  //   for (let i = 0; i < listaRecibosByGrupo.length; i++) {
  //     if (listaRecibosByGrupo[i].grupo.persona.id === persona.id) {
  //       listaRecibosFiltrada.push(listaRecibosByGrupo[i]);
  //     }
  //   }
  //   return listaRecibosFiltrada;
  // }

  // public filtrarListaGruposByGrupoPersona(listaGrupos: Grupo[], grupo: Grupo): Persona[] {
  //   let listaPersonas: Persona[] = [];
  //   for (let i = 0; i < listaGrupos.length; i++) {
  //     if (listaGrupos[i].persona.id === grupo.persona.id) {
  //       listaPersonas.push(listaGrupos[i].persona);
  //     }
  //   }
  //   return listaPersonas;
  // }

  // public recibirPersonaFromListaPersonas(listaPersonas: Persona[], indice: number): Persona {
  //   return listaPersonas[indice];
  // }

  // public filtrarDefinitivo(): void {
  //   this.listaGruposFiltrada = this.filtrarGruposBySuscripcion(this.grupo, this.listaGrupos);
  //   let persona: Persona = <Persona>{};
  //   for(let i = 0; i < this.listaGruposFiltrada.length; i++) {
  //     if (this.listaGruposFiltrada[i].persona.id === this.grupo.persona.id){
  //       persona = this.listaGruposFiltrada[i].persona;
  //       this.listaRecibosFiltrada = this.filtrarRecibosByPersona(this.listaRecibosByGrupo, persona);
  //     }
  //   }
  // }


}
