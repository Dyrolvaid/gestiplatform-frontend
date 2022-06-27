import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
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

  constructor(private _personasService: PersonasService,
              private _router:Router) {
    this.items = [
      {
        label: 'Suscripciones',
        icon: PrimeIcons.PLAY,
        routerLink: '/home/suscripciones'
      },
      {
        label: 'Personas',
        icon: PrimeIcons.USERS,
        //routerLink: '/etc'
      },
      {
        label: 'Recibos',
        icon: PrimeIcons.EURO,
        //routerLink: '/etc'
      },
      {
        label: this.personaActiva.nombre,
        icon: PrimeIcons.USER,
        items: [
          {
            label: 'Gestionar cuenta',
            icon: PrimeIcons.COG
          },
          {
            label: 'Cerrar Sesión',
            icon: PrimeIcons.POWER_OFF,
            command: (event : Event) => this.logout()
          },
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
