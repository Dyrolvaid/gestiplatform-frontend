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
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {TableModule} from "primeng/table";
import {KnobModule} from 'primeng/knob';
import {CheckboxModule} from "primeng/checkbox";
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [],
  exports: [
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    PasswordModule,
    ProgressBarModule,
    RippleModule,
    ToastModule,
    TableModule,
    KnobModule,
    CheckboxModule,
    TabViewModule
  ]
})
export class PrimengModule { }
