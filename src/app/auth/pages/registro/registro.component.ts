import {Component, OnInit} from '@angular/core';
import {PersonasService} from "../../../shared/services/personas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  // providers: [ PersonasService ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroComponent implements OnInit {

  public form: FormGroup;

  constructor(private _router: Router, private _personasService: PersonasService, private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      persona_correo: ["", [Validators.required, Validators.email]],
      persona_nombre: ["", [Validators.required, Validators.minLength(5)]],
      persona_clave: ["", [Validators.required, Validators.minLength(5)]],
      persona_telefono: ["", [Validators.required, Validators.minLength(9)]]
    });
  }

  get personaCorreo() {
    return this.form.get("persona_correo");
  }
  get personaNombre() {
    return this.form.get("persona_nombre");
  }
  get personaClave() {
    return this.form.get("persona_clave");
  }
  get personaTelefono() {
    return this.form.get("persona_telefono");
  }

  ngOnInit(): void {
  }

  public registrarse() {
    let nuevaPersona = <Persona>{};
    nuevaPersona.correo = this.form.value.persona_correo;
    nuevaPersona.nombre = this.form.value.persona_nombre;
    nuevaPersona.clave = this.form.value.persona_clave;
    nuevaPersona.telefono = this.form.value.persona_telefono;
    this._personasService.crearPersona(nuevaPersona).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        console.error("crearPersona fracasó con el error: ", error);
      }
    });
    this._router.navigate(['/home/suscripciones']);
  }
}
