import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {Recibo} from "../../../shared/interfaces/recibo.interface";
import {RecibosService} from "../../../shared/services/recibos.service";

@Component({
  selector: 'app-tarjeta-detalles',
  templateUrl: './tarjeta-detalles.component.html',
  styleUrls: ['./tarjeta-detalles.component.css']
})
export class TarjetaDetallesComponent implements OnInit {

  public grupo: Grupo;
  public limitePerfiles: number = 0;
  public limiteReproduciones: number = 0;
  public listaRecibos: Recibo[];
  public deuda: boolean;

  constructor(private _dynamicDialogConfig: DynamicDialogConfig, private _recibosService: RecibosService) {
    this.grupo = <Grupo>{};
    this.listaRecibos = [];
    this.deuda= false;
  }

  public consultaGetRecibosByGrupo(): void {
    if (this.grupo.id) {
      this._recibosService.getRecibosByGrupo(this.grupo.id).subscribe({
        next: (resp: Recibo[]) => {
          console.log('Recibos:', resp);
          //this.estadoCargando = false;
          this.listaRecibos = resp;
          for (const recibo of this.listaRecibos) {
            console.log(recibo.cobrado);
            if(!recibo.cobrado) {
              this.deuda = true;
            }



          }
        },
        error: (error) => {
          console.error('Recibos:', error);
          //this.estadoCargando = false;
        }
      });
    }
  }


  ngOnInit(): void {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    this.limitePerfiles = this._dynamicDialogConfig.data.grupo.limitePerfiles;
    console.log (this.grupo);




    this.consultaGetRecibosByGrupo();

  }

}
