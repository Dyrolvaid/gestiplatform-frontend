import { Component, OnInit } from '@angular/core';
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";

@Component({
  selector: 'app-home-suscripciones',
  templateUrl: './home-suscripciones.component.html',
  styleUrls: ['./home-suscripciones.component.css']
})
export class HomeSuscripcionesComponent implements OnInit {

  constructor(private _personaService: PersonasService) { }

  ngOnInit(): void {
  }

  get personaActiva(): Persona {
    return this._personaService.personaActiva;
  }

}
