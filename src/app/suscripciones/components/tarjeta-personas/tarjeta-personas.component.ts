import { Component, OnInit } from '@angular/core';
import {PersonasService} from "../../../shared/services/personas.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {tap} from "rxjs";

@Component({
  selector: 'app-tarjeta-listaPersonas',
  templateUrl: './tarjeta-personas.component.html',
  styleUrls: ['./tarjeta-personas.component.css']
})
export class TarjetaPersonasComponent implements OnInit {

  public grupo: Grupo;
  public cargando : boolean = false;
  public gruposConPersonasPorSuscripcion: Grupo[];
  public persona : Persona;
  public listaPersonas: Persona[];
  public listaPersonasEnSuscripcion: Persona [];
  // public resultadosBuscar: string[];
  public correo: string;
  public listaCorreos: string[];

  constructor(private _personasService: PersonasService, private _dynamicDialogConfig : DynamicDialogConfig) {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.gruposConPersonasPorSuscripcion = [];
    this.persona = <Persona>{};
    this.listaPersonas = [];
    this
    // this.resultadosBuscar = [];
    this.correo = "";
    this.listaCorreos = [];
    this.listaPersonasEnSuscripcion = [];
  }

  ngOnInit(): void {
    this.consultaGetPersonasByIdSuscripcion();
    this.sacarPersonasDeGrupos();
    this._personasService.getAllPersonas()
      .pipe(tap(listaPersonas => this.listaPersonas = listaPersonas))
      .subscribe(x => console.log(x));
  }

  public consultaGetPersonasByIdSuscripcion(): void {
    this.cargando = true;
    this._personasService.getPersonasByIdSuscripcion(this.grupo.suscripcion.id).subscribe(
      {
        next: (resp) => {
          this.cargando = false;
          console.log('Respuesta listaPersonas:', resp);
          this.gruposConPersonasPorSuscripcion = resp;
          // for (let grupoIterado of this.gruposConPersonasPorSuscripcion) {
          //   this.listaPersonas.push(grupoIterado.persona);
          // }
        },
        error: (error : HttpErrorResponse) => {
          this.cargando = false;
          console.error("Error al consultar las listaPersonas:", error);
        }
      }
    );
  }

  public filtrarListaCorreos() {
    let listaCorreosFiltrada: string[] = [];
    for (let i = 0; i < this.listaPersonas.length; i++) {
      if (this.listaPersonas[i].correo.toLowerCase().includes(this.correo.toLowerCase())){
        this.persona = this.listaPersonas[i];
        listaCorreosFiltrada.push(this.listaPersonas[i].correo);
      }
    }
    this.listaCorreos = listaCorreosFiltrada;
  }

  public sacarPersonasDeGrupos() {
    let listaPersonaEnSuscripcion: Persona[] = [];
    for (let i = 0; i < this.gruposConPersonasPorSuscripcion.length; i++) {
      listaPersonaEnSuscripcion.push(this.gruposConPersonasPorSuscripcion[i].persona);
    }
    this.listaPersonasEnSuscripcion = listaPersonaEnSuscripcion;
  }

  // public consultaGetPersonaByCorreo(): void {
  //   this.cargando = true;
  //   this._personasService.getPersonaByCorreo(this.correo).subscribe({
  //     next: (resp:Persona) => {
  //     this.cargando = false;
  //     this.persona = resp;
  //     },
  //     error: (error : HttpErrorResponse) => {
  //     this.cargando = false;
  //     console.error("Error al consultar GetPersonaByCorreo:", error);
  //     },
  //   });
  // }

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
}
