import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PersonasService} from "../../../shared/services/personas.service";
import {Persona} from "../../../shared/interfaces/persona.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public persona_correo;
  public persona_clave;

  constructor(private _router: Router, private _personasService: PersonasService) {
    this.persona_correo = "";
    this.persona_clave = "";
  }

  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  ngOnInit(): void {
  }


  public login() {
    this._personasService.autorizar(this.persona_correo, this.persona_clave).subscribe({
      error: (error) => {
        console.error("Autorizar fracasó con el error: ", error);
      }
    });
  }

  public logout() {
    //this._router.navigate(['/auth']);
  }
}
