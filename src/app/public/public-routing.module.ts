import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './factura/factura.component';
import { PublicComponent } from './public.component';


const routes: Routes = [
  {
    path:'', component: PublicComponent,
    children:[
      {
        path:'factura',
        component:FacturaComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
