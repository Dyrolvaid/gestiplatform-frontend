import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Recibo[]>(url, options);
  }

  public getRecibosBySuscripcionId(idSuscripcion: number): Observable<Recibo[]> {
    const url = `/api/v1/recibos/suscripcion/${idSuscripcion}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Recibo[]>(url, options);
  }

  public getGruposBySuscripcionId(idSuscripcion: number): Observable<Grupo[]> {
    const url = `/api/v1/grupos/suscripcion/${idSuscripcion}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Grupo[]>(url, options);
  }

  //Tengo que hacer este método porque la tabla grupos tiene un campo que referencia otro de los recibos.
  public borrarRecibo(idRecibo: number): Observable<Object> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    const url = `/api/v2/recibos/${idRecibo}`;
    return this._http.delete(url, options);
  }
  // Método para obtener todos los recibos de una persona
  public obtenerRecibosPorPersonaId(idPersona: number): Observable<Recibo[]> {
    const url = `/api/v1/recibos/persona/${idPersona}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Recibo[]>(url, options);
  }

  public marcarReciboComoPagadoPorId(reciboACambiar: Recibo): Observable<Recibo> {
    const url = `/api/v1/recibos`;
    return this._http.patch<Recibo>(url, reciboACambiar);
  }

  public crearReciboNuevoPorGrupo(plantillaReciboNuevo: Recibo) {
    const url = '/api/v1/recibos';
    return this._http.post(url, plantillaReciboNuevo);
  }
}
