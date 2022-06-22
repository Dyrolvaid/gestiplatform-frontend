import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form : FormGroup;
  public inicioPulsado: boolean | undefined = undefined;

  constructor(private _router: Router,
              private _personasService: PersonasService,
              private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      persona_correo: [],
      persona_clave: []
    });
  }

  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  ngOnInit(): void {
  }

  public loginPulsado(): void {
    this.inicioPulsado = true;
  }

  public registrarsePulsado(): void {
    this.inicioPulsado = false;
  }

  public onSubmit():void {
    if(this.inicioPulsado) {
      this.login();
    } else {
      this.registrarse();
    }
  }

  public login() {
    this._personasService.autorizar(this.form.value.persona_correo, this.form.value.persona_clave).subscribe({
      error: (error) => {
        console.error("Autorizar fracasó con el error: ", error);
      }
    });
  }

  public registrarse() {
    this._personasService.crearPersona();
  }

  public logout() {
    this._personasService.cerrarSession();
  }
}
