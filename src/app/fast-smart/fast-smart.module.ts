import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FastSmartRoutingModule } from './fast-smart-routing.module';
import { FastSmartComponent } from './fast-smart.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [FastSmartComponent, FooterComponent],
  imports: [
    CommonModule,
    FastSmartRoutingModule,

    SharedModule
  ]
})
export class FastSmartModule { }
