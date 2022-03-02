import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaDetalleComponent } from './factura/factura-detalle/factura-detalle.component';
import { FacturaComponent } from './factura/factura.component';
import { PublicComponent } from './public.component';


const routes: Routes = [
  {
    path:'', component: PublicComponent,
    children:[
      {
        path:'factura',
        loadChildren: () => import('../public/factura/factura.module').then(m => m.FacturaModule)
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
