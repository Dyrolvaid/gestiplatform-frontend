import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class SharedModule { }
