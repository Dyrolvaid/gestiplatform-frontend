import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {PersonasService} from "../../shared/services/personas.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _personasService: PersonasService, private _router: Router) {
  }
  canActivate(): Observable<boolean> | boolean {
    return this._personasService.verificarAlmacenamiento().pipe(
      tap(estaAlmacenado => {
        if (!estaAlmacenado) {
          this._router.navigate(['./auth/login']);
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this._personasService.verificarAlmacenamiento().pipe(
      tap(estaAlmacenado => {
        if (!estaAlmacenado) {
          this._router.navigate(['./auth/login']);
        }
      })
    );
  }
}
