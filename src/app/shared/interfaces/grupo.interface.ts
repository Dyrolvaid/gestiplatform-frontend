import {Persona} from "./persona.interface";
import {Suscripcion} from "./suscripcion.interface";

export interface Grupo {
  id: number;
  persona: Persona;
  suscripcion: Suscripcion;
  grupoActivo: boolean;
  admin: boolean;
}

