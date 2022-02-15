import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { FacturaComponent } from './factura/factura.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';



@NgModule({
  declarations: [
    PublicComponent,
    FacturaComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PublicModule { }
