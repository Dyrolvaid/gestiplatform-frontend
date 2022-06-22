import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {Observable, tap} from "rxjs";

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

  public autorizar(correo: string, clave: string): Observable<Persona> {
    const url = `/api/personas/findByCorreoAndClave/${correo}/${clave}`;
    return this._http.get<Persona>(url)
      .pipe(
        tap((resp) => {
          this._personaActiva = resp;
        })
      );
  }
}
