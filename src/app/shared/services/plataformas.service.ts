import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Plataforma} from "../interfaces/plataforma.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlataformasService {

  constructor(private _http: HttpClient) {
  }

  public obtenerPlataformaId(id: number) {
    let url =`/api/v1/plataformas/${id}`;
    return this._http.get<Plataforma>(url);
  }

  public obtenerTodasLasPlataformas(): Observable<Plataforma[]> {
    let url =`/api/v1/plataformas`;
    return this._http.get<Plataforma[]>(url);
  }
}

