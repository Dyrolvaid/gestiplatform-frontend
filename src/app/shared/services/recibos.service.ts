import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recibo} from "../interfaces/recibo.interface";
import {Observable} from "rxjs";
import {Grupo} from "../interfaces/grupo.interface";

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  constructor(private _http: HttpClient) {}

  public getRecibosByGrupo(idGrupo: number): Observable<Recibo[]> {
    const url = `/api/v1/recibos/grupos/${idGrupo}`;
    return this._http.get<Recibo[]>(url);
  }

  public getGrupoByPersona(): Observable<Grupo[]> {
    const url = `/api/v1/grupos`;
    return this._http.get<Grupo[]>(url);
  }
}
