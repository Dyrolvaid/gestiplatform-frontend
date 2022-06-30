import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Grupo} from "../../../shared/interfaces/grupo.interface";

@Component({
  selector: 'app-tarjeta-detalles',
  templateUrl: './tarjeta-detalles.component.html',
  styleUrls: ['./tarjeta-detalles.component.css']
})
export class TarjetaDetallesComponent implements OnInit {

  public grupo?: Grupo;
 public limitePerfiles: number = 0;
  public limiteReproduciones: number = 0;

  constructor(private _dynamicDialogConfig: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.grupo = this._dynamicDialogConfig.data.grupo;
    console.log (this.grupo);
  }

}
