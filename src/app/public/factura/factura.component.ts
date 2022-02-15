import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FacturaService } from './service/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  rows :any;
  nameCliente:string
  ColumnMode = ColumnMode;

  public formSearch: FormGroup;
  public formFecha: FormGroup;
  constructor(private facturaServ:  FacturaService,private fb: FormBuilder) { }

  ngOnInit() {
    this.facturaServ.getListFactura().subscribe(
      (result) =>{
          this.rows = result;
          console.log(this.rows);
      }
    )

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
          console.log(result);
          this.rows = result;

        }
    )

  }

}
