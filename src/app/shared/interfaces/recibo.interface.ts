import {Grupo} from "./grupo.interface";

export interface Recibo {
  id:             number;
  grupo:          Grupo;
  fechaEmision:   Date;
  fechaCobro:     Date;
  vigenciaInicio: Date;
  vigenciaFin:    Date;
  cobrado:        boolean;
  importe:        number;
  reciboActivo:   boolean;
}
