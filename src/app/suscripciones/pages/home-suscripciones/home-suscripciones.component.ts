import { Component, OnInit } from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
import {SelectItem} from "primeng/api";
import {PeriodicidadesService} from "../../../shared/services/periodicidades.service";
import {FormasDePagoService} from "../../../shared/services/formas-de-pago.service";

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
  // public periodicidadNueva: Periodicidad;
  // public formaPagoNueva: FormaDePago;
  public grupoNuevo: Grupo;
  public formSuscripcion: FormGroup;
  // public dropPlataformas: Plataforma[];
  public listaTodasLasPlataformas: Plataforma[];
  // public suscripcion: Suscripcion;
  public dropdownPlataformas: SelectItem[];
  public plataformaSeleccionada: Plataforma;
  public listaTodasLasPeriodicidades: Periodicidad[];
  public dropdownPeriodicidades: SelectItem[];
  public periodicidadSeleccionada: Plataforma;
  public listaTodasLasFormasDePago: FormaDePago[];
  public dropdownFormasDePago: SelectItem[];
  public formaDePagoSeleccionada: Plataforma;
  public grupoNuevoRaw: any;


  // darkMode: boolean = false;


  // dropPagado = [
  //   { label: 'No', value: 0 },
  //   { label: 'Si', value: 1 },
  // ];
  // formSuscripcion: FormGroup = this.formBuilder.group({
  //   plataforma : [''],
  //   correo : [''],
  //   nombre : [''],
  //   clave : [''],
  //   telefono : [''],
  //   id : []
  // });


  constructor(public gruposService: GruposService, private formBuilder: FormBuilder,
              private _personasService: PersonasService,
              private _plataformaService: PlataformasService,
              private _gruposService: GruposService,
              private _suscripcionesService: SuscripcionesService,
              private _periodicidadesService: PeriodicidadesService,
              private _formasDePagoService: FormasDePagoService) {
    this.gruposService.cargarConjuntoGrupos();
    this.mostrar = false;

    this.plataformaNueva = <Plataforma>{};
    this.suscripcionNueva = <Suscripcion>{};
    // this.grupoNuevo = {
    //   id: 0,
    //   persona: <Persona>{},
    //   suscripcion: <Suscripcion>{},
    //   grupoActivo: true,
    //   admin: true,
    // };

    // this.periodicidadNueva= {
    //   id :1,
    //     tipo: "Mensual",
    //     descripcion: "Cada mes"
    // }
    // this.formaPagoNueva= {
    //   id: 1,
    //     descripcion: "Bizum",
    //     favorita: false
    // }

    this.formSuscripcion = new FormGroup({
      plataforma: new FormControl(''),
      periodicidad: new FormControl(''),
      formaDePago: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
      credencialesCorreo: new FormControl(''),
      credencialesClave: new FormControl(''),
      fechaAlta: new FormControl(''),
      fechaProximoCobro: new FormControl(''),
      suscripcionActiva: new FormControl('')
    });

    // this.dropPlataformas = [
    //   {nombre: 'Netflix',     id:1},
    //   {nombre: 'HBO',         id:2},
    //   {nombre: 'Disney+',     id:3},
    //   {nombre: 'Spotify',     id:4},
    //   {nombre: 'Movistar',    id:5},
    //   {nombre: 'Fubo Tv',     id:6},
    //   {nombre: 'Prime Video', id:7}
    // ];
    this.listaTodasLasPlataformas = [];
    this.dropdownPlataformas = [];
    this.plataformaSeleccionada = {} as Plataforma;
    this.listaTodasLasPeriodicidades = [];
    this.dropdownPeriodicidades = [];
    this.periodicidadSeleccionada = {} as Plataforma;
    this.listaTodasLasFormasDePago = [];
    this.dropdownFormasDePago = [];
    this.formaDePagoSeleccionada = {} as Plataforma;
    this.grupoNuevo = {} as Grupo;


  }

  /* dark mode*/

  ngOnInit(): void {
    this.consultaObtenerTodasLasPlataformas();
    this.consultaObtenerTodasLasPeriodicidades();
    this.consultaObtenerTodasLasFormasDePago();
    // for(let i = 0; i < this.listaTodasLasPlataformas.length; i++) {
    //   this.dropdownPlataformas.push({
    //     label: this.listaTodasLasPlataformas[i].nombre,
    //     value: this.listaTodasLasPlataformas[i]});
    // }
  }

  public consultaObtenerTodasLasPlataformas(): void {
    this._plataformaService.obtenerTodasLasPlataformas()
      .pipe(finalize(() => {
        console.log("Bien o mal, ObtenerTodasLasPlataformas completada.");
        for (let i = 0; i < this.listaTodasLasPlataformas.length; i++) {
          this.dropdownPlataformas.push({
            label: this.listaTodasLasPlataformas[i].nombre,
            value: this.listaTodasLasPlataformas[i]
          });
        }

      }))
      .subscribe({
        next: (resp) => {
          console.log("ObtenerTodasLasPlataformas: ", resp);
          this.listaTodasLasPlataformas = resp;
        },
        error: (error) => {
          console.log("ObtenerTodasLasPlataformas: ", error);
        }
      });
  }

  public consultaObtenerTodasLasPeriodicidades(): void {
    this._periodicidadesService.obtenerTodasLasPeriodicidades()
      .pipe(finalize(() => {
        console.log("Bien o mal, ObtenerTodasLasPeriodicidades completada.");
        for (let i = 0; i < this.listaTodasLasPeriodicidades.length; i++) {
          this.dropdownPeriodicidades.push({
            label: this.listaTodasLasPeriodicidades[i].tipo,
            value: this.listaTodasLasPeriodicidades[i]
          });
        }

      }))
      .subscribe({
        next: (resp) => {
          console.log("ObtenerTodasLasPeriodicidades: ", resp);
          this.listaTodasLasPeriodicidades = resp;
        },
        error: (error) => {
          console.log("ObtenerTodasLasPeriodicidades: ", error);
        }
      });
  }

  public consultaObtenerTodasLasFormasDePago(): void {
    this._formasDePagoService.obtenerTodasLasFormasDePago()
      .pipe(finalize(() => {
        console.log("Bien o mal, ObtenerTodasLasFormasDePago completada.");
        for (let i = 0; i < this.listaTodasLasFormasDePago.length; i++) {
          this.dropdownFormasDePago.push({
            label: this.listaTodasLasFormasDePago[i].descripcion,
            value: this.listaTodasLasFormasDePago[i]
          });
        }

      }))
      .subscribe({
        next: (resp) => {
          console.log("ObtenerTodasLasFormasDePago: ", resp);
          this.listaTodasLasFormasDePago = resp;
        },
        error: (error) => {
          console.log("ObtenerTodasLasFormasDePago: ", error);
        }
      });
  }

  public abrirNuevaSuscripcion() {
    this.mostrar = true;
    this.formSuscripcion.patchValue(this._personaActiva);
  }


  // public formularioSuscripcionEnviada() {
  //
  // }
  // public guardarNuevaSuscripcion(){
  //   console.log(this.formSuscripcion.value.plataforma);
  //   let idPlataforma = this.formSuscripcion.value.plataforma;
  //   this._plataformaService.obtenerPlataformaId(idPlataforma)
  //     .pipe(finalize(()=>{ this.consultaPostearSuscripcionNueva(this.suscripcionNueva)}))
  //     .subscribe({
  //     next: (resp) =>{
  //       this.plataformaNueva = resp;
  //     },
  //     error: (error) =>{
  //       console.log(error);
  //     }
  //
  //    })
  // }

  public consultaPostearSuscripcionNueva() {
    // this.suscripcionNueva.plataforma = this.formSuscripcion.value.plataforma;
    // this.suscripcionNueva.periodicidad = this.formSuscripcion.value.periodicidad;
    // this.suscripcionNueva.formaDePago = this.formSuscripcion.value.formaDePago;
    // this.suscripcionNueva.descripcion = this.formSuscripcion.value.descripcion;
    this.formSuscripcion.value.fechaAlta = new Date();
    // this.suscripcionNueva.fechaAlta = this.formSuscripcion.value.fechaAlta;
    if (this.formSuscripcion.value.periodicidad.id === 1) {
      this.formSuscripcion.value.fechaProximoCobro = new Date(this.formSuscripcion.value.fechaAlta.setDate(this.formSuscripcion.value.fechaAlta.getDate() + 28));
      // this.suscripcionNueva.fechaProximoCobro = this.formSuscripcion.value.fechaProximoCobro;
    } else if (this.formSuscripcion.value.periodicidad.id === 2) {
      this.formSuscripcion.value.fechaProximoCobro = new Date(this.formSuscripcion.value.fechaAlta.setDate(this.formSuscripcion.value.fechaAlta.getDate() + 365));
      // this.suscripcionNueva.fechaProximoCobro = this.formSuscripcion.value.fechaProximoCobro;
    }
    //TODO: añadir más condiciones para otras periodicidades si hay tiempo

    // this.suscripcionNueva.precio = this.formSuscripcion.value.precio;
    // this.suscripcionNueva.credencialesCorreo = this.formSuscripcion.value.correo;
    // this.suscripcionNueva.credencialesClave = this.formSuscripcion.value.clave;
    this.formSuscripcion.value.suscripcionActiva = true;
    // this.suscripcionNueva.suscripcionActiva = this.formSuscripcion.value.suscripcionActiva;
    console.log(this.formSuscripcion.value);
    // console.log(this.suscripcionNueva);
    if(this.formSuscripcion.value.suscripcionActiva){
      this._suscripcionesService.crearSuscripcionNueva(this.formSuscripcion.value)
        .pipe(finalize(() => {
          console.log('Se ha completado el intento del post suscripcion');
          this.crearNuevoGrupo();
        }))
        .subscribe({
          next: (resp) => {
            console.log('Post suscripcion nueva', JSON.stringify(resp));
          },
          error: (error) => {
            console.log('Error al post suscripcion', error);

          }
        });
    }
  }

  public crearNuevoGrupo(): void {
    // this.grupoNuevo.grupoActivo = true;
    // this.grupoNuevo.admin = true;
    // this.grupoNuevo.persona = this._personasService.personaActiva;
    // this.grupoNuevo.suscripcion = this.suscripcionNueva;
    this.grupoNuevoRaw = {
      grupoActivo : true,
      admin : true,
      persona : this._personaActiva,
      suscripcion : this.formSuscripcion.value
    } as Grupo;
    console.log(this.grupoNuevoRaw);
    this._gruposService.postGrupo(this.grupoNuevoRaw)
      .pipe(finalize(() => {
        console.log('Se ha completado el intento del post grupo');
      }))
      .subscribe({
        next: (resp) => {
          console.log("Crear Grupo recibió la respuesta: ", resp);
        },
        error: (error) => {
          console.error("Crear Grupo recibió la respuesta: ", error);
        }
      });
  }
}
  // public guardarGrupo(suscripcion: Suscripcion) {
  //   console.log('Esta es la iD', this.formSuscripcion.value.id);
  //   if (this.grupoNuevo) {
  //    // this.grupoNuevo.persona.id = this.formSuscripcion.controls['id'].value;
  //     this.grupoNuevo.persona = this._personasService.personaActiva;
  //    //  this.grupoNuevo.persona.correo = this._personasService.personaActiva.correo;
  //    //  this.grupoNuevo.persona.clave = this._personasService.personaActiva.clave;
  //    //  this.grupoNuevo.persona.telefono = this._personasService.personaActiva.telefono;
  //     this.grupoNuevo.suscripcion = suscripcion;
  //     this.grupoNuevo.grupoActivo = true;
  //     this.grupoNuevo.admin = true;
  //
  //     this._gruposService.postGrupo(this.grupoNuevo)
  //       .pipe(finalize(()=>{
  //         console.log('Se ha completado el intento del post')}))
  //       .subscribe({
  //       next: (resp) => {
  //         console.log('Guardar grupos',JSON.stringify(resp));
  //       },
  //       error: (error) => {
  //         console.log(error);
  //
  //       }
  //     });
  //   }
  // }
  // get personaActiva(): Persona {
  //   return this._personasService.personaActiva;
  // }

