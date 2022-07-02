import {Grupo} from "./grupo.interface";

export interface Recibo {
  id:             number;
  grupo:          Grupo;
  fechaEmision:   string;
  fechaCobro:     string;
  vigenciaInicio: string;
  vigenciaFin:    string;
  cobrado:        boolean;
  importe:        number;
  reciboActivo:   boolean;
}
