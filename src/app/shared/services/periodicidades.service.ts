import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Periodicidad} from "../interfaces/periodicidad.interface";

@Injectable({
  providedIn: 'root'
})
export class PeriodicidadesService {

  constructor(private _http: HttpClient) { }

  public obtenerTodasLasPeriodicidades(): Observable<Periodicidad[]> {
    let url =`/api/v1/periodicidades`;
    return this._http.get<Periodicidad[]>(url);
  }
}
