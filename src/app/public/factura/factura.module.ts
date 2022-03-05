import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FacturaComponent } from './factura.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { FacturaRoutingModule } from './factura-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({

  declarations: [
    FacturaComponent,
    FacturaDetalleComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class FacturaModule { }
