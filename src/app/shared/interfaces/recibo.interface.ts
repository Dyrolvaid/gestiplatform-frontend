import {SuscripcionesPorPersona} from "./suscripciones-por-persona.interface";

export interface Recibo {
  id:             number;
  grupo:          SuscripcionesPorPersona;
  fechaEmision:   string;
  fechaCobro:     string;
  vigenciaInicio: string;
  vigenciaFin:    string;
  cobrado:        boolean;
  importe:        number;
}
