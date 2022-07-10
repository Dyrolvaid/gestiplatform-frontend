import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormaDePago} from "../interfaces/forma-de-pago.interface";

@Injectable({
  providedIn: 'root'
})
export class FormasDePagoService {

  constructor(private _http: HttpClient) { }

  public obtenerTodasLasFormasDePago(): Observable<FormaDePago[]> {
    let url =`/api/v1/formasdepago`;
    return this._http.get<FormaDePago[]>(url);
  }
}
