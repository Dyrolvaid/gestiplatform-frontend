import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {map, Observable, of, tap} from "rxjs";
import {Grupo} from "../interfaces/grupo.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private _personaActiva?: Persona;

  constructor(private _http: HttpClient) {
  }

  get personaActiva(): Persona {
    return {...this._personaActiva!};
  }

  public verificarAlmacenamiento(): Observable<boolean> {
    if (!localStorage.getItem("token")) {
      return of(false);
    }
    const idPersonaActiva = localStorage.getItem("token");
    const url = `/api/v1/personas/${idPersonaActiva}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Persona>(url, options)
      .pipe(
        map((persona) => {
          this._personaActiva = persona;
          return true;
        })
      );
  }

  public autorizar(correo: string, clave: string): Observable<Persona> {
    const url = `/api/v1/personas/findByCorreoAndClave/${correo}/${clave}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Persona>(url, options)
      .pipe(
        tap((resp) => {
          this._personaActiva = resp;
          localStorage.setItem("token", this._personaActiva.id.toString());
        })
      );
  }

  public cerrarSession() {
    this._personaActiva = undefined;
    localStorage.removeItem("token");
  }

  public crearPersona(persona: Persona): Observable<Persona> {
    const url = `/api/v2/personas`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.post<Persona>(url, persona, options);
  }

  public getPersonasByIdSuscripcion(id:number): Observable<Grupo[]> {
    const url= `/api/v1/grupos/suscripcion/${id}/`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Grupo[]>(url, options);
  }

  public getPersonaByCorreo(correo: string): Observable<Persona> {
    const url = `/api/v1/personas/correo/${correo}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Persona>(url, options);
  }

  public getAllPersonas(): Observable<Persona[]> {
    const url = `/api/v1/personas`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Persona[]>(url, options);
  }
}
