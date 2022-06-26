import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items : MenuItem[];

  constructor(private _personasService: PersonasService, private _router:Router) {
    this.items = [
      {
        label: 'Home',
        disabled: true,
        routerLink: '/home/suscripciones'
      },
      {
        label: 'Personas',
        styleClass: 'p-menuitem p-button-raised p-button-text p-button-warning'
        //routerLink: '/etc'
      },
      {
        label: 'Credenciales',
        //routerLink: '/etc'
      },
      {
        label: 'Recibos',
        //routerLink: '/etc'
      },
      {
        label: this.personaActiva.nombre,

        items: [
          {
            label: 'Cerrar Sesión',
            command: (event : Event) => this.logout()
          }
        ]
      }
    ];
  }

  ngOnInit(): void {}

  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  public logout() {
    this._personasService.cerrarSession();
    this._router.navigate(['/auth/login']);
  }
}
