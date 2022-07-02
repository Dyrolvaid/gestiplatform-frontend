import {Persona} from "./persona.interface";

export interface Grupo {
  id:          number;
  persona:     Persona;
  suscripcion: Suscripcion;
  grupoActivo: boolean;
}

export interface Suscripcion {
  id:                 number;
  plataforma:         Plataforma;
  periodicidad:       Periodicidad;
  formaDePago:        FormaDePago;
  descripcion:        string;
  fechaAlta:          Date;
  fechaProximoCobro:  Date;
  precio:             number;
  credencialesCorreo: string;
  credencialesClave:  string;
  suscripcionActiva: boolean;
}

export interface FormaDePago {
  id:          number;
  descripcion: string;
  favorita:    boolean;
}

export interface Periodicidad {
  id:          number;
  tipo:        string;
  descripcion: string;
}

export interface Plataforma {
  id:                   number;
  nombre:               string;
  urlGeneral:           string;
  urlAdmin:             string;
  logo:                 string;
  limitePerfiles:       number;
  limiteReproducciones: number;
  color:                string;
}
