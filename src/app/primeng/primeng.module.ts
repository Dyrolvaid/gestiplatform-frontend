import { NgModule } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {PanelMenuModule} from "primeng/panelmenu";

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    PanelMenuModule,
    PasswordModule,
    RippleModule,
    ToastModule
  ]
})
export class PrimengModule { }
