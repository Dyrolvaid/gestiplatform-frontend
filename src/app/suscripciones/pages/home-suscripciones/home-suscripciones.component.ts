import { Component, OnInit } from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {PersonasService} from "../../../shared/services/personas.service";

@Component({
  selector: 'app-home-suscripciones',
  templateUrl: './home-suscripciones.component.html',
  styleUrls: ['./home-suscripciones.component.css']
})
export class HomeSuscripcionesComponent implements OnInit {
  public mostrar: boolean;
  public _personaActiva: Persona = this._personasService.personaActiva;

  formSuscripcion: FormGroup = this.formBuilder.group({
    plataforma : [''],
    correo : [''],
    nombre : [''],
    clave : [''],
    telefono : ['']
  })

  dropPlataformas=[
    {label: 'Netflix', value:1},
    {label: 'HBO', value:2},
    {label: 'Disney+', value:3},
    {label: 'Spotify', value:4},
    {label: 'Movistar', value:5},
    {label: 'Fubo Tv', value:6},
    {label: 'Prime Video', value:7}


  ]
  constructor(public gruposService: GruposService, private formBuilder: FormBuilder,
              private _personasService: PersonasService) {
    this.gruposService.cargarConjuntoGrupos();
    this.mostrar= false;

  }

  public abrirNuevaSuscripcion(){
    this.mostrar= true;
    this.formSuscripcion.patchValue(this._personaActiva);
  }


  public formularioSuscripcionEnviada() {

  }

  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  ngOnInit(): void {
  }

}
