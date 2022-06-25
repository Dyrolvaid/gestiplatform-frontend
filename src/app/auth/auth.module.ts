import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimengModule} from "../primeng/primeng.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  exports: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ]
})
export class AuthModule { }
