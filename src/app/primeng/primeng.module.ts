import { NgModule } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {ProgressBarModule} from "primeng/progressbar";

@NgModule({
  declarations: [],
  exports: [
    DialogModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    PasswordModule,
    ProgressBarModule,
    RippleModule,
    ToastModule
  ]
})
export class PrimengModule { }
