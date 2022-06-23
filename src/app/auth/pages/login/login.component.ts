import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PersonasService} from "../../../shared/services/personas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../../../shared/interfaces/persona.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ PersonasService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public form : FormGroup;
  public personaActiva: Persona;

  constructor(private _router: Router,
              private _personasService: PersonasService,
              private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      persona_correo: ["", [Validators.required, Validators.email]],
      persona_clave: ["", [Validators.required, Validators.minLength(5)]]
    });
    this.personaActiva = this._personasService.personaActiva;
  }

  get personaCorreo() {
    return this.form.get("persona_correo");
  }

  get personaClave() {
    return this.form.get("persona_clave");
  }

  ngOnInit(): void {
  }

  public login() {
    this._personasService.autorizar(this.form.value.persona_correo, this.form.value.persona_clave).subscribe({
      next: (resp) => {
        if (resp) {
          //TODO Redirigir a suscripciones en lugar de devolver a login
          this._router.navigate(['/auth/login']);
        } else {
          this._router.navigate(['/auth/login']);
        }
      },
      error: (error : HttpErrorResponse) => {
        console.error("Autorizar fracasó con el error: ", error.statusText);
        this._router.navigate(['/auth/login']);
      }
    });
  }
  public logout() {
    this._personasService.cerrarSession();
  }
}
