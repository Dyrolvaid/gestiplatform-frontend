import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recibo} from "../interfaces/recibo.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  constructor(private _http: HttpClient) {}

  public getRecibosPorSuscripcion(idSuscripcion: number): Observable<Recibo[]> {
    const url = `/api/v1/recibos/grupos/${idSuscripcion}`;
    return this._http.get<Recibo[]>(url);
  }

}
