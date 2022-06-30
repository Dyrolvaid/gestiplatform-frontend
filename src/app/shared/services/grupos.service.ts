import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {Grupo} from "../interfaces/grupo.interface";
import {Observable} from "rxjs";
import {PersonasService} from "./personas.service";

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private _grupos?: Grupo[];
  private _estadoCargando : boolean;

  constructor(
    private _http: HttpClient,
    private _personasService: PersonasService) {
    this._grupos = [];
    this._estadoCargando = false;
  }

  get grupos(): Grupo[] {
    return this._grupos!;
  }

  get estadoCargando() {
    return this._estadoCargando;
  }

  public getGrupoByPersona(persona: Persona): Observable<Grupo[]> {
    const url = `/api/v1/grupos/persona/${persona.id}`;
    return this._http.get<Grupo[]>(url);
  }

  public cargarConjuntoGrupos(): void {
    this._estadoCargando = true;
    this.getGrupoByPersona(this._personasService.personaActiva).subscribe({
      next: (resp) => {
        console.log('Datos obtenidos:', resp);
        this._estadoCargando = false;
        this._grupos = resp;
      },
      error: (error : HttpErrorResponse) => {
        this._estadoCargando = false;
        console.error(error);
      }
    });
  }
}
