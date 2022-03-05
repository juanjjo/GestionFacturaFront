import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { Observable, Subscription } from 'rxjs';
import { FacturaGetService } from 'src/app/shared/navbar/services/FacturaGet.service';
import { FacturaService } from './service/factura.service';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  rows :any;
  nameCliente:string
  idFactura:number;
  public formSearch: FormGroup;
  public formFecha: FormGroup;
  idReloadRow:any;

  private data$: Observable<number>;
  constructor(private facturaServ:  FacturaService,private fb: FormBuilder,
    private facturagetService:FacturaGetService,private router: Router)
    {
      this.facturagetService.facturaObservableData=-1;
      this.data$=facturagetService.factura;
      this.data$.subscribe(
        result=>{
          this.idReloadRow=result;

        }
      );

    }

  ngOnInit() {
    if(this.idReloadRow==-1){
     this.loadingDatos();
    }
    this.loadingDatos();
    //this.loadingDatos();

    this.formSearch = this.fb.group({
      nombreCliente:  ['', [Validators.required]],
    })
    this.formFecha = this.fb.group({
      fechaDesde: ['', [Validators.required]],
      fechaHasta: ['', [Validators.required]],
    })
  }

  findByCliente(){
    this.facturaServ.getListFacturaByCliente(this.formSearch.value.nombreCliente).subscribe(
      (result)=>{
        this.rows = result;
      }
    )
  }

  findByFecha(){
    let desde: string =this.formFecha.value.fechaDesde;
    let hasta : string =this.formFecha.value.fechaHasta;
    this.facturaServ.getListFacturaByFecha(desde,hasta).subscribe(
        (result)=>{
          this.rows = result;

        }
    )

  }



  loadingDatos(){
    this.facturaServ.getListFactura().subscribe(
      (result) =>{
        this.rows = result;
        this.rows = [...this.rows]
    }
    )
  }

  setIdFactura(id:any){
    this.idFactura=id;
  }
  deleteFactura(){
    this.facturaServ.deleteContacto(this.idFactura).subscribe(
      (result)=>{
        this.loadingDatos();
      }
    )
  }
   getIdFactura(id:any){
    this.idFactura = id;
    this.facturagetService.facturaObservableData=id;
    this.router.navigate(['/factura/detalle']);
  }

}
