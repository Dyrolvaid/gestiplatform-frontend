import {Plataforma} from "./plataforma.interface";
import {Periodicidad} from "./periodicidad.interface";
import {FormaDePago} from "./forma-de-pago.interface";

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
  suscripcionActiva:  boolean;
}
