import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Suscripcion} from "../interfaces/suscripcion.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuscripcionesService {

  constructor(private _http: HttpClient) { }

  public obtenerTodasLasSuscripciones(): Observable<Suscripcion[]> {
    const url = `/api/v1/suscripciones`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Suscripcion[]>(url, options);
  }
  public crearSuscripcionNueva(suscripcionRecibida: Suscripcion): Observable<Suscripcion> {
    const url = `/api/v1/suscripciones`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.post<Suscripcion>(url, suscripcionRecibida, options);
  }

}
