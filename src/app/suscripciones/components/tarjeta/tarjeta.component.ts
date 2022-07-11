import {Component, Input, OnInit} from '@angular/core';
import {GruposService} from "../../../shared/services/grupos.service";
import localeES from '@angular/common/locales/es';
import {registerLocaleData} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {TarjetaDetallesComponent} from "../tarjeta-detalles/tarjeta-detalles.component";
import {TarjetaPersonasComponent} from "../tarjeta-personas/tarjeta-personas.component";
import {TarjetaRecibosComponent} from "../tarjeta-recibos/tarjeta-recibos.component";
import {Grupo} from "../../../shared/interfaces/grupo.interface";
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
  providers: [
    DialogService,
    MessageService
  ],
  entryComponents: [
    TarjetaDetallesComponent,
    TarjetaPersonasComponent,
    TarjetaRecibosComponent
  ]
})
export class TarjetaComponent implements OnInit {

  @Input() grupo?: Grupo;
  @Input() grupoParaSuscripcionNueva?: Grupo;
  public items: MenuItem[];
  // @Input() suscripcion?: Suscripcion;

  constructor(
    public dialogService: DialogService,
    public gruposService: GruposService,
    private _messageService: MessageService
  ) {
    this.items = [];
  }

  ngOnInit(): void {
    registerLocaleData(localeES);
    this.items = [
      {
        icon: 'pi pi-money-bill',
        command: (event) => {this.mostrarRecibos();}
      },
      {
        icon: 'pi pi-user-edit',
        command: (event) => {this.mostrarPersonas();}
      },
      {
        icon: 'pi pi-eye',
        command: (event) => {this.mostrarDetalles();}
      }
    ];
  }

  public mostrarDetalles() {
    const ventana = this.dialogService.open(TarjetaDetallesComponent, {
      header: 'Detalles',
      width: '30%',
      modal: true,
      data: {
        grupo: this.grupo
      }
    });
  }

  public mostrarPersonas() {
    const ventana = this.dialogService.open(TarjetaPersonasComponent, {
      header: 'Suscriptores',
      width: '70%',
      modal: true,
      data: {
        grupo: this.grupo,
        grupoParaSuscripcionNueva: this.grupoParaSuscripcionNueva
      }
    });
  }

  public mostrarRecibos(){
    const ventana = this.dialogService.open(TarjetaRecibosComponent, {
      header: 'Gestión de Cobros',
      width: '70%',
      modal: true,
      data: {
        grupo: this.grupo
      }
    });
  }




}
