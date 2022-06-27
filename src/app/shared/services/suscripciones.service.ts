import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {SuscripcionesPorPersona} from "../interfaces/suscripciones-por-persona.interface";
import {Observable} from "rxjs";
import {PersonasService} from "./personas.service";

@Injectable({
  providedIn: 'root'
})
export class SuscripcionesService {

  private _suscripciones?: SuscripcionesPorPersona[];
  private _estadoCargandoSuscripciones : boolean;

  get suscripciones(): SuscripcionesPorPersona[] | undefined {
    return this._suscripciones;
  }

  get estadoCargandoSuscripciones() {
    return this._estadoCargandoSuscripciones;
  }

  constructor(private _http: HttpClient,
              private _personasService: PersonasService) {
    this._estadoCargandoSuscripciones = false;
  }

  public getSuscripcionesPorPersona(persona: Persona): Observable<SuscripcionesPorPersona[]> {
    const url = `/api/v1/grupos/persona/${persona.id}`;
    return this._http.get<SuscripcionesPorPersona[]>(url);
  }

  public cargarConjuntoSuscripciones(): void {
    this._estadoCargandoSuscripciones = true;
    this.getSuscripcionesPorPersona(this._personasService.personaActiva).subscribe({
      next: (resp) => {
        this._estadoCargandoSuscripciones = false;
        this._suscripciones = resp;
      },
      error: (error : HttpErrorResponse) => {
        this._estadoCargandoSuscripciones = false;
        console.error(error);
      }
    });
  }
}
