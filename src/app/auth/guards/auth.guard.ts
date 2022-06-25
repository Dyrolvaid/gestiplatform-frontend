import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment
} from '@angular/router';
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
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this._personasService.verificarAlmacenamiento().pipe(
      tap(estaAlmacenado => {
        if (!estaAlmacenado) {
          this._router.navigate(['./auth/login']);
        }
      })
    );
  }
}
