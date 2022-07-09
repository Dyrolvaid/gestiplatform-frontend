import { Component, OnInit } from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Persona} from "../../../shared/interfaces/persona.interface";
import {PersonasService} from "../../../shared/services/personas.service";
import {Suscripcion} from "../../../shared/interfaces/suscripcion.interface";
import {Plataforma} from "../../../shared/interfaces/plataforma.interface";
import {PlataformasService} from "../../../shared/services/plataformas.service";
import {Periodicidad} from "../../../shared/interfaces/periodicidad.interface";
import {FormaDePago} from "../../../shared/interfaces/forma-de-pago.interface";
import {SuscripcionesService} from "../../../shared/services/suscripciones.service";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {finalize} from "rxjs";

@Component({
  selector: 'app-home-suscripciones',
  templateUrl: './home-suscripciones.component.html',
  styleUrls: ['./home-suscripciones.component.css']
})
export class HomeSuscripcionesComponent implements OnInit {
  public mostrar: boolean;
  public _personaActiva: Persona = this._personasService.personaActiva;
  public plataformaNueva: Plataforma
  public suscripcionNueva: Suscripcion;
  public periodicidadNueva:  Periodicidad;
  public formaPagoNueva: FormaDePago;
  public grupoNuevo? : Grupo;
  // public suscripcion: Suscripcion;


  darkMode: boolean = false;

  dropPlataformas=[
    {label: '-- Selecciona plataforma --', value:0},
    {label: 'Netflix', value:1},
    {label: 'HBO', value:2},
    {label: 'Disney+', value:3},
    {label: 'Spotify', value:4},
    {label: 'Movistar', value:5},
    {label: 'Fubo Tv', value:6},
    {label: 'Prime Video', value:7}
  ]
  dropPagado = [
    { label: 'No', value: 0 },
    { label: 'Si', value: 1 },
  ];
  formSuscripcion: FormGroup = this.formBuilder.group({
    plataforma : [''],
    correo : [''],
    nombre : [''],
    clave : [''],
    telefono : [''],
    id : []
  })



  constructor(public gruposService: GruposService, private formBuilder: FormBuilder,
              private _personasService: PersonasService,
              private _plataformaService: PlataformasService,
              private _gruposService: GruposService,
              private _suscripcionesService: SuscripcionesService) {
    this.gruposService.cargarConjuntoGrupos();
    this.mostrar= false;

    this.plataformaNueva  = <Plataforma>{};
    this.suscripcionNueva = <Suscripcion>{};
    this.grupoNuevo = {
      id: 0,
      persona: <Persona>{},
      suscripcion: <Suscripcion>{},
      grupoActivo: true,
      admin: true,

    };

    this.periodicidadNueva= {
      id :1,
        tipo: "Mensual",
        descripcion: "Cada mes"
    }
    this.formaPagoNueva= {
      id: 1,
        descripcion: "Bizum",
        favorita: false
    }
  }
  /* dark mode*/





  public abrirNuevaSuscripcion(){
    this.mostrar= true;
    this.formSuscripcion.patchValue(this._personaActiva);
  }


  public formularioSuscripcionEnviada() {

  }
  public guardarNuevaSuscripcion(){
    console.log(this.formSuscripcion.controls['plataforma'].value);
    let idPlataforma = this.dropPlataformas[6].value;
    this._plataformaService.obtenerPlataformaId(idPlataforma)
      .pipe(finalize(()=>{ this.consultaPostearSuscripcionNueva(this.suscripcionNueva)}))
      .subscribe({
      next: (resp) =>{
        this.plataformaNueva = resp;
        this.suscripcionNueva.plataforma = this.plataformaNueva;
        this.suscripcionNueva.periodicidad= this.periodicidadNueva;
        this.suscripcionNueva.formaDePago = this.formaPagoNueva;
        this.suscripcionNueva.descripcion = "Suscripción nueva de prueba";
        this.suscripcionNueva.fechaAlta = new Date();
        let proximaFechaCobro = this.suscripcionNueva.fechaAlta.setDate(this.suscripcionNueva.fechaAlta.getDate() + 365);
        this.suscripcionNueva.fechaProximoCobro =new Date(proximaFechaCobro);
        this.suscripcionNueva.precio = 234;
        this.suscripcionNueva.credencialesCorreo = this.formSuscripcion.controls['correo'].value;
        this.suscripcionNueva.credencialesClave = this.formSuscripcion.controls['clave'].value;
        this.suscripcionNueva.suscripcionActiva = true;

      },
      error: (error) =>{
        console.log(error);
      }

     })
  }

  public guardarGrupo(suscripcion: Suscripcion) {
    console.log('Esta es la iD', this.formSuscripcion.controls['id'].value);
    if (this.grupoNuevo) {
     // this.grupoNuevo.persona.id = this.formSuscripcion.controls['id'].value;
      this.grupoNuevo.persona.correo = this._personasService.personaActiva.correo;
      this.grupoNuevo.persona.clave = this._personasService.personaActiva.clave;
      this.grupoNuevo.persona.telefono = this._personasService.personaActiva.telefono;
      this.grupoNuevo.suscripcion = suscripcion;
      this.grupoNuevo.grupoActivo = true;
      this.grupoNuevo.admin = true;

      this._gruposService.postGrupo(this.grupoNuevo)
        .pipe(finalize(()=>{
          console.log('Se ha completado el intento del post')}))
        .subscribe({
        next: (resp) => {
          console.log('Guardar grupos',JSON.stringify(resp));
        },
        error: (error) => {
          console.log(error);

        }
      });
    }
  }
    public consultaPostearSuscripcionNueva(suscripcionAPostear: Suscripcion){
      console.log('linea 156 ',suscripcionAPostear);
    this._suscripcionesService.crearSuscripcionNueva(suscripcionAPostear)
      .pipe(finalize(()=>{this.guardarGrupo(suscripcionAPostear)}))
      .subscribe({
        next:(resp) =>{
          console.log('Post suscripcion Nueva',JSON.stringify(resp));
        },
        error: (error) => {
          console.log('Error al post suscripcion', error);

        }
      });
  }
  get personaActiva(): Persona {
    return this._personasService.personaActiva;
  }

  ngOnInit(): void {
  }

}
