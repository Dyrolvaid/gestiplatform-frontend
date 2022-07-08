import {Component, OnInit} from '@angular/core';
import {PersonasService} from "../../../shared/services/personas.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {finalize, tap} from "rxjs";
import {GruposService} from "../../../shared/services/grupos.service";
import {RecibosService} from "../../../shared/services/recibos.service";
import {Recibo} from "../../../shared/interfaces/recibo.interface";
import {Suscripcion} from "../../../shared/interfaces/suscripcion.interface";
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";

@Component({
  selector: 'app-tarjeta-listaPersonas',
  templateUrl: './tarjeta-personas.component.html',
  styleUrls: ['./tarjeta-personas.component.css']
})
export class TarjetaPersonasComponent implements OnInit {

  public grupo: Grupo;
  public cargando: boolean = false;
  public gruposConPersonasPorSuscripcion: Grupo[];
  public persona: Persona;
  public personaACrear: Persona;
  public listaPersonas: Persona[];
  public listaPersonasEnSuscripcion: Persona [];
  // public resultadosBuscar: string[];
  public correo: string;
  public listaCorreos: string[];
  public listaRecibosPorPersona: Recibo[];
  public personaActiva: Persona;
  public listaSuscripciones: Suscripcion[];
  public listaTodosLosGrupos: Grupo[];
  public otroGrupo: Grupo;

  constructor(private _personasService: PersonasService,
              private _dynamicDialogConfig: DynamicDialogConfig,
              private _gruposService: GruposService,
              private _recibosService: RecibosService,
              private _suscripcionesService: SuscripcionesService) {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.gruposConPersonasPorSuscripcion = [];
    this.persona = <Persona>{};
    this.personaACrear = <Persona>{};
    this.listaPersonas = [];
    // this.resultadosBuscar = [];
    this.correo = "";
    this.listaCorreos = [];
    this.listaPersonasEnSuscripcion = [];
    this.listaRecibosPorPersona = [];
    this.personaActiva = this._personasService.personaActiva;
    this.listaSuscripciones = [];
    this.listaTodosLosGrupos = [];
    this.otroGrupo = {} as Grupo;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this._personasService.getPersonaByCorreo(this.correo)
  //     .pipe(tap(personaACrear => this.personaACrear = personaACrear))
  //     .subscribe();
  //   }

  ngOnInit(): void {
    this.consultaGetPersonasByIdSuscripcion();
    this.sacarPersonasDeGrupos();
    this.consultaObtenerTodasLasPersonas();
  }


  //1.
  consultaObtenerTodasLasPersonas(){
    this._personasService.getAllPersonas()
      .pipe(finalize(()=>{this.cargando = false; this.consultaObtenerTodasLasSuscripciones()}))
      .subscribe({
        next: (resp) => this.listaPersonas = resp
      });
  }

  public consultaObtenerTodasLasSuscripciones(){
    this._suscripcionesService.obtenerTodasLasSuscripciones()
      .pipe(finalize(()=>{this.cargando = false; this.consultaObtenerTodosLosGrupos()}))
      .subscribe({
        next: (resp) => this.listaSuscripciones = resp
      });
  }

  public consultaObtenerTodosLosGrupos(){
    this._gruposService.obtenerTodosLosGrupos()
      .pipe(finalize(()=>{this.cargando = false;}))
      .subscribe({
        next: (resp) => this.listaTodosLosGrupos = resp
      });
  }

  public crearPersonaByCorreo() {
      if (this.correo !== ''){
        this._personasService.getPersonaByCorreo(this.correo!)
          .pipe(tap(personaACrear => this.personaACrear = personaACrear))
          .subscribe();
      }
}

  public consultaGetPersonasByIdSuscripcion(): void {
    this.cargando = true;
    this._personasService.getPersonasByIdSuscripcion(this.grupo.suscripcion.id).subscribe(
      {
        next: (resp) => {
          this.cargando = false;
          this.gruposConPersonasPorSuscripcion = resp;
          // for (let grupoIterado of this.gruposConPersonasPorSuscripcion) {
          //   this.listaPersonas.push(grupoIterado.persona);
          // }
        },
        error: (error: HttpErrorResponse) => {
          this.cargando = false;
          console.error("Error al consultar las listaPersonas:", error);
        }
      }
    );
  }

  public filtrarListaCorreos() {
    let listaCorreosFiltrada: string[] = [];
    if (this.correo != undefined) {
      for (let i = 0; i < this.listaPersonas.length; i++) {
        if (this.listaPersonas[i].correo.toLowerCase().includes(this.correo.toLowerCase())) {
          this.persona = this.listaPersonas[i];
          listaCorreosFiltrada.push(this.listaPersonas[i].correo);
        }
      }
    }
    this.listaCorreos = listaCorreosFiltrada;
  }

  public sacarPersonasDeGrupos() {
    let listaPersonasEnSuscripcion: Persona[] = [];
    for (let i = 0; i < this.gruposConPersonasPorSuscripcion.length; i++) {
      listaPersonasEnSuscripcion.push(this.gruposConPersonasPorSuscripcion[i].persona);
    }
    this.listaPersonasEnSuscripcion = listaPersonasEnSuscripcion;
  }

  // public consultaGetPersonaByCorreo(): void {
  //   this.cargando = true;
  //   if (this.correo) {
  //     this._personasService.getPersonaByCorreo(this.correo)
  //       // .pipe(finalize(() => this.crearNuevoGrupoByPersona()))
  //       .subscribe({
  //         next: (resp: Persona) => {
  //           this.cargando = false;
  //           this.personaACrear = resp;
  //         },
  //         error: (error: HttpErrorResponse) => {
  //           this.cargando = false;
  //           console.error("Error al consultar GetPersonaByCorreo:", error);
  //         },
  //       });
  //   }
  // }

  public crearNuevoGrupo(): void {
    if(this.personaACrear.id
      && this.listaTodosLosGrupos.length
      && this.gruposConPersonasPorSuscripcion.filter(e => e.persona.id !== this.personaACrear.id)){
      this.cargando = true;
      let grupoNuevo = <Grupo>{};
        // id: this.grupo.id,
        // id: this._gruposService.grupos[this._gruposService.grupos.length - 1].id! + 1,
        // grupoActivo: true,
        // admin: false,
        // persona: this.personaACrear,
        // suscripcion: this.grupo.suscripcion
      // grupoNuevo.id = this._gruposService.grupos[this._gruposService.grupos.length - 1].id! + 1;
      // for (let i = 0; i < this.listaTodosLosGrupos.length; i++){
      //   if (/*!this.listaPersonasEnSuscripcion.indexOf(this.listaTodosLosGrupos[i].persona)
      //     && this.listaPersonas.indexOf(this.listaTodosLosGrupos[i].persona)*/
      //   this.listaTodosLosGrupos[i].id! < this.listaTodosLosGrupos.length){
          /*&& this.grupo.suscripcion.id === grupoIterado.suscripcion.id && this.grupo.persona.id === grupoIterado.persona.id*/
          // grupoNuevo.id = this.listaTodosLosGrupos[this.listaTodosLosGrupos.length].id;
          grupoNuevo.grupoActivo = true;
          grupoNuevo.admin = false;
          grupoNuevo.suscripcion = this.grupo.suscripcion;
          grupoNuevo.persona = this.personaACrear;
          console.log("Grupo Nuevo antes de posteo: ", JSON.stringify(grupoNuevo));
        // }
      // }
        if (grupoNuevo.persona) {
          this._gruposService.postGrupo(grupoNuevo)
            .pipe(finalize(()=>{this.consultaGetPersonasByIdSuscripcion(); this.cargando = false}))
            .subscribe({
              next: (resp) => {
                console.log(resp);
              },
              error: (error) => {
                console.error("Crear Grupo fracasó con el error: ", error);
              }
            });
          // .subscribe({
          //   next: (resp: any) => {
          //     console.log("Resultado de postear un grupo", JSON.stringify(resp));
          //     this.consultaGetPersonasByIdSuscripcion();
          //     this.cargando = false;
          //   },
          //   error: (error: HttpErrorResponse) => {
          //     console.log("Error al añadir persona a la suscripción:", error);
          //     this.cargando = false;
          //   }
          // });
        }
        }
    }

  public consultaObtenerRecibosPorPersonaId(persona: Persona): void {
    if (persona.id) {
      this.cargando = true;
      this._recibosService.obtenerRecibosPorPersonaId(persona.id)
        .pipe(finalize(() => {
          this.cargando = false;
        }))
        .subscribe({
          next: (resp) => {
            console.log("Se ha obtenido la siguiente lista de recibos por persona: ", resp);
            this.listaRecibosPorPersona = resp;
          },
          error: (error) => {
            console.log("No se ha podido esta lista de recibos por persona, por el error: ", error);
          }
        });
    }
  }

  public consultaBorrarRecibosPorId(grupo: Grupo):void {
    for (let recibo of this.listaRecibosPorPersona) {
      if(recibo.grupo.suscripcion.id === grupo.suscripcion.id) {
        this._recibosService.borrarRecibo(recibo.id)
          .pipe(finalize(() => {
            this.cargando = false;
          }))
          .subscribe({
            next: (resp) => {
              console.log("El siguiente recibo ha sido eliminado: ", resp);
            },
            error: (error) => {
              console.log("No se ha podido eliminar este recibo por el error: ", error);
            }
          });
      }
    }
  }

  public consultaDeleteGrupoById(grupo: Grupo): void {
    this.consultaObtenerRecibosPorPersonaId(grupo.persona);
    this.consultaBorrarRecibosPorId(grupo);
    if (grupo.id) {
      this.cargando = true;
      this._gruposService.deleteGrupoById(grupo.id)
        .pipe(finalize(() => {
          this.consultaGetPersonasByIdSuscripcion();
          this.cargando = false;
        }))
        .subscribe({
          next: (resp) => {
            console.log("El siguiente grupo ha sido eliminado de esta suscripción: ", resp);
          },
          error: (error) => {
            console.log("No se ha podido eliminar este grupo por el error: ", error);
          }
          });
    }
  }
}
  // public consultaGetAllPersonas(): void {
  //   this.cargando = true;
  //   this._personasService.getAllPersonas().subscribe({
  //     next: (resp: Persona[]) => {
  //       this.cargando = false;
  //       this.listaPersonas = resp;
  //     },
  //     error: (error : HttpErrorResponse) => {
  //       this.cargando = false;
  //       console.error("Error al consultar GetAllPersonas:", error);
  //     }
  //   });
  // }

  // public buscar(event: any) {
  //   this.getPersonaByCorreo(event.query).then((data: String[]) => {
  //     this.resultadosBuscar = data;
  //   })
  // }



  // public getPersonaByCorreo(event: any) {
  //   for (let persona of this.listaPersonas) {
  //     if (persona.correo === event.query) {
  //       this.persona = persona;
  //     }
  //   }
  // }

