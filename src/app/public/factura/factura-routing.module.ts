import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from '../public.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { FacturaComponent } from './factura.component';



const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'',
        component:FacturaComponent,
        data:{
          title: 'factura'
        }
      },
      {
        path: 'detalle',
        component:FacturaDetalleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
