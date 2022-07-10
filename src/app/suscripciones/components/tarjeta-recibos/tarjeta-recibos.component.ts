import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecibosService} from "../../../shared/services/recibos.service";
import {Recibo} from "../../../shared/interfaces/recibo.interface";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {finalize} from "rxjs";
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {Periodicidad} from "../../../shared/interfaces/periodicidad.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-tarjeta-recibos',
  templateUrl: './tarjeta-recibos.component.html',
  styleUrls: ['./tarjeta-recibos.component.css']
})
export class TarjetaRecibosComponent implements OnInit{

  public estadoCargando: boolean;
  public listaRecibosByGrupo: Recibo[];
  public listaRecibosBySuscripcionId: Recibo[];
  // public listaRecibosFiltrada: Recibo[];
  public grupo: Grupo;
  public listaGrupos: Grupo[];
  public contadorPersonas: number;
  // public listaGruposFiltrada: Grupo[];
  // public listaPersonas: Persona[];
  public reciboAModificar: Recibo;
  public personaActiva: Persona;

  constructor(private _recibosService: RecibosService,
              private _dynamicDialogConfig: DynamicDialogConfig,
              private _changeDetectorRef: ChangeDetectorRef,
              private _personasService: PersonasService,
              public _datePipe: DatePipe) {
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
    this.reciboAModificar = {} as Recibo;
    this.personaActiva = this._personasService.personaActiva;
  }

  ngOnInit(): void {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.crearOActualizarRecibos();
  }

  public crearOActualizarRecibos() {
    this.estadoCargando = true;
    this.consultaGetRecibosByGrupo();
    this.consultaGetRecibosBySuscripcionId();
    // this.consultaGetGrupoByPersona();
    this.consultaGetGruposBySuscripcionId();
    this.contarPersonasByGrupo();
  }

  ngAfterContentChecked() {
    this._changeDetectorRef.detectChanges();
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

  //Parchear el booleano de "cobrado" del Recibo con PATCH
  public marcarReciboComoCobrado(recibo: Recibo) {
    this.reciboAModificar = recibo;
    let fechaActual = Date.now;
    recibo.cobrado = true;
    recibo.fechaCobro = new Date(fechaActual());
    this._recibosService.marcarReciboComoPagadoPorId(this.reciboAModificar)
      .pipe(finalize(()=> {}))
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  // TODO: Si no hay ningún recibo, permitir seleccionar una periodicidad existente y establecer la primera fecha.
  public nuevoReciboSegunSeleccionUsuario(fechaInicio: Date, periodicidadSeleccionada: Periodicidad, precioPeriodicoTotal: number) {
    for (let grupo of this.listaGrupos) {
      let plantillaReciboNuevo: Recibo = {} as Recibo;
      let fechaActual = new Date();
      plantillaReciboNuevo.grupo = grupo;
      plantillaReciboNuevo.cobrado = false;
      plantillaReciboNuevo.reciboActivo = true;
      plantillaReciboNuevo.grupo.suscripcion.precio = precioPeriodicoTotal;
      plantillaReciboNuevo.importe = plantillaReciboNuevo.grupo.suscripcion.precio / this.listaGrupos.length;
      plantillaReciboNuevo.fechaCobro = fechaInicio;
      plantillaReciboNuevo.vigenciaInicio = fechaInicio;
      if (periodicidadSeleccionada.id === 1) {
        let fechaMasMes = fechaActual.setDate(fechaActual.getDate() + 28);
        plantillaReciboNuevo.vigenciaFin = new Date(fechaMasMes);
        grupo.suscripcion.fechaProximoCobro = new Date(fechaMasMes);
        plantillaReciboNuevo.fechaCobro = plantillaReciboNuevo.grupo.suscripcion.fechaProximoCobro;
      } else if (periodicidadSeleccionada.id === 2) {
        let fechaMasYear = fechaActual.setDate(fechaActual.getDate() + 365);
        plantillaReciboNuevo.vigenciaFin = new Date(fechaMasYear);
        grupo.suscripcion.fechaProximoCobro = new Date(fechaMasYear);
        plantillaReciboNuevo.fechaCobro = plantillaReciboNuevo.grupo.suscripcion.fechaProximoCobro;
      }
      plantillaReciboNuevo.fechaEmision = fechaInicio;
      this._recibosService.crearReciboNuevoPorGrupo(plantillaReciboNuevo)
        .pipe(finalize(() => {console.log("Intento de 'nuevoReciboSegunSeleccionUsuario ha finalizado'")}))
        .subscribe({
          next: (resp) => {
            console.log("'nuevoReciboSegunSeleccionUsuario' ha devuelto: ", resp);
          },
          error: (error) => {
            console.log("'nuevoReciboSegunSeleccionUsuario' ha devuelto: ", error);
          }
        });
    }
  }
  // TODO: Añadir automáticamente un recibo nuevo por grupo si para la siguiente fecha de cobro faltan menos días que los resultantes de sumarle la periodicidad a la fecha actual.
  public nuevoReciboSegunPeriodicidad() {
    for (let grupo of this.listaGrupos) {
      let plantillaReciboNuevo: Recibo = {} as Recibo;
      let fechaActual = new Date();
      plantillaReciboNuevo = this.listaRecibosByGrupo[this.listaRecibosByGrupo.length - 1];
      plantillaReciboNuevo.grupo = grupo;
      plantillaReciboNuevo.cobrado = false;
      plantillaReciboNuevo.reciboActivo = true;
      plantillaReciboNuevo.importe = plantillaReciboNuevo.grupo.suscripcion.precio / this.listaGrupos.length;
      if (grupo.suscripcion.periodicidad.id === 1) {
        let fechaMasMes = fechaActual.setDate(fechaActual.getDate() + 28);
        grupo.suscripcion.fechaProximoCobro = new Date(fechaMasMes);
        plantillaReciboNuevo.fechaCobro = plantillaReciboNuevo.grupo.suscripcion.fechaProximoCobro;
      } else if (grupo.suscripcion.periodicidad.id === 2) {
        let fechaMasYear = fechaActual.setDate(fechaActual.getDate() + 365);
        grupo.suscripcion.fechaProximoCobro = new Date(fechaMasYear);
        plantillaReciboNuevo.fechaCobro = plantillaReciboNuevo.grupo.suscripcion.fechaProximoCobro;
      }
      plantillaReciboNuevo.vigenciaInicio = this.listaRecibosByGrupo[this.listaRecibosByGrupo.length - 1].vigenciaInicio;
      plantillaReciboNuevo.fechaEmision = new Date(fechaActual);
      this._recibosService.crearReciboNuevoPorGrupo(plantillaReciboNuevo)
        .pipe(finalize(() => {console.log("Intento de 'nuevoReciboSegunPeriodicidad ha finalizado'")}))
        .subscribe({
          next: (/*resp*/) => {
            // console.log("'nuevoReciboSegunPeriodicidad' ha devuelto: ", resp);
          },
          error: (error) => {
            console.log("'nuevoReciboSegunPeriodicidad' ha devuelto: ", error);
          }
        });
    }
  }




  // public consultaGetGrupoByPersona(): void {
  //   if (this.grupoIterado.id) {
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

  // public filtrarGruposBySuscripcion(grupoIterado: Grupo, listaGrupos: Grupo[]): Grupo[] {
  //   let listaGruposFiltrada: Grupo[] = [];
  //   for (let i = 0; i < listaGrupos.length; i++) {
  //     if (grupoIterado.suscripcion.id === listaGrupos[i].suscripcion.id) {
  //       listaGruposFiltrada.push(listaGrupos[i]);
  //     }
  //   }
  //   console.log("filtro",listaGruposFiltrada);
  //   return listaGruposFiltrada;
  // }

  // public filtrarRecibosByPersona(listaRecibosByGrupo: Recibo[], persona: Persona): Recibo[] {
  //   let listaRecibosFiltrada: Recibo[] = [];
  //   for (let i = 0; i < listaRecibosByGrupo.length; i++) {
  //     if (listaRecibosByGrupo[i].grupoIterado.persona.id === persona.id) {
  //       listaRecibosFiltrada.push(listaRecibosByGrupo[i]);
  //     }
  //   }
  //   return listaRecibosFiltrada;
  // }

  // public filtrarListaGruposByGrupoPersona(listaGrupos: Grupo[], grupoIterado: Grupo): Persona[] {
  //   let listaPersonas: Persona[] = [];
  //   for (let i = 0; i < listaGrupos.length; i++) {
  //     if (listaGrupos[i].persona.id === grupoIterado.persona.id) {
  //       listaPersonas.push(listaGrupos[i].persona);
  //     }
  //   }
  //   return listaPersonas;
  // }

  // public recibirPersonaFromListaPersonas(listaPersonas: Persona[], indice: number): Persona {
  //   return listaPersonas[indice];
  // }

  // public filtrarDefinitivo(): void {
  //   this.listaGruposFiltrada = this.filtrarGruposBySuscripcion(this.grupoIterado, this.listaGrupos);
  //   let persona: Persona = <Persona>{};
  //   for(let i = 0; i < this.listaGruposFiltrada.length; i++) {
  //     if (this.listaGruposFiltrada[i].persona.id === this.grupoIterado.persona.id){
  //       persona = this.listaGruposFiltrada[i].persona;
  //       this.listaRecibosFiltrada = this.filtrarRecibosByPersona(this.listaRecibosByGrupo, persona);
  //     }
  //   }
  // }


}
