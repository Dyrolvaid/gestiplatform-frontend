import {Component, Input, OnInit} from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";
import localeES from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {TarjetaDetallesComponent} from "../tarjeta-detalles/tarjeta-detalles.component";
import {TarjetaPersonasComponent} from "../tarjeta-personas/tarjeta-personas.component";
import {TarjetaRecibosComponent} from "../tarjeta-recibos/tarjeta-recibos.component";
import {Grupo} from "../../../shared/interfaces/grupo.interface";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
  providers: [DialogService],
  entryComponents: [
    TarjetaDetallesComponent,
    TarjetaPersonasComponent,
    TarjetaRecibosComponent
  ]
})
export class TarjetaComponent implements OnInit {

  @Input() grupo?: Grupo;


  constructor(
    public dialogService: DialogService,
    public gruposService: GruposService
  ) {}

  ngOnInit(): void {
    registerLocaleData(localeES);
  }

  public mostrarDetalles() {
    const ventana = this.dialogService.open(TarjetaDetallesComponent, {
      header: 'Detalles',
      width: '70%',
      modal: true,
      data: {
        grupo: this.grupo
      }
    });
  }

  public mostrarPersonas() {
    const ventana = this.dialogService.open(TarjetaPersonasComponent, {
      header: 'Personas',
      width: '70%',
      modal: true,
      data: {
        grupo: this.grupo
      }
    });
  }

  public mostrarRecibos(){
    const ventana = this.dialogService.open(TarjetaRecibosComponent, {
      header: 'Recibos',
      width: '70%',
      modal: true,
      data: {
        grupo: this.grupo
      }
    });
  }




}
