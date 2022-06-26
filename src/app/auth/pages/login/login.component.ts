import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PersonasService} from "../../../shared/services/personas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Persona} from "../../../shared/interfaces/persona.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credencialesNoValidas:boolean;
  public estadoCargandoLogin:boolean;

  public form : FormGroup;
  public personaActiva?: Persona;

  constructor(private _router: Router,
              private _personasService: PersonasService,
              private _formBuilder: FormBuilder) {

    //inicializamos algunos atributos
    this.form = this._formBuilder.group({
      persona_correo: ["", [Validators.required, Validators.email]],
      persona_clave: ["", [Validators.required, Validators.minLength(5)]]
    });
    //this.personaActiva = this._personasService.personaActiva;
    this.credencialesNoValidas = false;
    this.estadoCargandoLogin = false;
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
    this.estadoCargandoLogin = true; //Mostramos el spinner en el botón
    this._personasService.autorizar(this.form.value.persona_correo, this.form.value.persona_clave).subscribe({
      next: (resp) => {
        this.estadoCargandoLogin = false;
        if (resp) {
          this._router.navigate(['/home/suscripciones']);
        } else {
          //Por aquí no debería pasar nunca, ya que el api no devuelve un falsy
          this.credencialesNoValidas = true;
          this._router.navigate(['/auth/login']);
        }
      },
      error: (error : HttpErrorResponse) => {
        this.estadoCargandoLogin = false;
        console.error("Autorizar fracasó con el error: ", error);
        this.credencialesNoValidas = true;
        this._router.navigate(['/auth/login']);
      }
    });
  }
}
