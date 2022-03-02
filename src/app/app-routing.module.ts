import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './public/factura/factura.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },

  {
    path: '',
    redirectTo: 'factura',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
