import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form : FormGroup;

  constructor(private _router: Router,
              private _personasService: PersonasService,
              private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      persona_correo: ["", [Validators.required, Validators.email]],
      persona_clave: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  get personaCorreo() {
    return this.form.get("persona_correo");
  }

  get personaClave() {
    return this.form.get("persona_clave");
  }

  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  ngOnInit(): void {
  }

  public login() {
    this._personasService.autorizar(this.form.value.persona_correo, this.form.value.persona_clave).subscribe({
      error: (error) => {
        console.error("Autorizar fracasó con el error: ", error);
      }
    });
  }

  public logout() {
    this._personasService.cerrarSession();
  }
}
