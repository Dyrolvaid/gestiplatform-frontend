import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Persona} from "../interfaces/persona.interface";
import {Grupo} from "../interfaces/grupo.interface";
import { Observable} from "rxjs";
import {PersonasService} from "./personas.service";

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private _grupos: Grupo[];
  private _estadoCargando : boolean;

  constructor(
    private _http: HttpClient,
    private _personasService: PersonasService) {
    this._grupos = [];
    this._estadoCargando = false;
  }

  get grupos(): Grupo[] {
    return this._grupos!;
  }

  get estadoCargando() {
    return this._estadoCargando;
  }

  public getGrupoByPersona(persona: Persona): Observable<Grupo[]> {
    const url = `/api/v1/grupos/persona/${persona.id}`;
    return this._http.get<Grupo[]>(url);
  }

  public cargarConjuntoGrupos(): void {
    this._estadoCargando = true;
    this.getGrupoByPersona(this._personasService.personaActiva).subscribe({
      next: (resp) => {
        this._estadoCargando = false;
        this._grupos = resp;
      },
      error: (error : HttpErrorResponse) => {
        this._estadoCargando = false;
        console.error(error);
      }
    });
  }

  public postGrupo(grupo: Grupo): Observable<Grupo> {
    const url = `/api/v1/grupos`;
    //const jsonFile = new File([JSON.stringify(grupo)], "file.json", {type: "application/json"});
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers };
    return this._http.post<Grupo>(url, grupo, options)
      // .pipe(
      // finalize(() => console.log('postGrupo Completado')),
      // tap(respuesta => console.log(respuesta)));
  }
  public deleteGrupoById(grupoId: number): Observable<Object> {
    const url = `/api/v2/grupos/${grupoId}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // let options = { /*headers: headers,*/ body: persona };
    return this._http.delete(url, options);
  }
  public obtenerTodosLosGrupos(): Observable<Grupo[]> {
    const url = `/api/v1/grupos`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    return this._http.get<Grupo[]>(url, options);
  }

  // public obtenerTodosLosGruposPorSuscripcion(idSuscripcion: number): Observable<Grupo[]> {
  //   const url = `/api/v1/grupos/${idSuscripcion}`;
  //   // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // let options = { headers: headers };
  //   return this._http.get<Grupo[]>(url);
  // }
}
