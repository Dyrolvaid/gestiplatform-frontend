import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {map, Observable, of, tap} from "rxjs";

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
    if (!localStorage.getItem("idActivo")){
      return of(false);
    }
    const idPersonaActiva = localStorage.getItem("idActivo");
    const url = `/api/personas/${idPersonaActiva}`;
    return this._http.get<Persona>(url)
      .pipe(
        map((persona) => {
          this._personaActiva = persona;
          return true;
        })
      );
  }

  public autorizar(correo: string, clave: string): Observable<Persona> {
    const url = `/api/personas/findByCorreoAndClave/${correo}/${clave}`;
    return this._http.get<Persona>(url)
      .pipe(
        tap((resp) => {
          this._personaActiva = resp;
          localStorage.setItem("idActivo", this._personaActiva.id.toString());
        })
      );
  }

  public cerrarSession() {
    this._personaActiva = undefined;
    localStorage.removeItem("idActivo");
  }

  public crearPersona() {

  }
}
