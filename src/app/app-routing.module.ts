import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './public/factura/factura.component';

const routes: Routes = [

  { path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },

  { path: '**',
    redirectTo: 'public/factura'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
