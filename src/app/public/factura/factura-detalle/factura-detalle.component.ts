import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,OnDestroy  } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { Observable, Subscription } from 'rxjs';
import { FacturaGetService } from 'src/app/shared/navbar/services/FacturaGet.service';
import { Detalle, detalleStatic, Factura, Producto } from '../models/factura';
import { FacturaDetalleService } from '../service/factura-detalle.service';
import { FacturaService } from '../service/factura.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.scss'],
})
export class FacturaDetalleComponent implements OnInit {

  rows:any;
  submittedProduct:boolean =false;
  submittedFactura:boolean = false;
  ColumnMode = ColumnMode;
  public factura: Factura;
  detalle: Detalle;
  detalleStatic:detalleStatic;
  detallesStatic: detalleStatic[] = [];
  detallesSave: Detalle[]=[];
  producto: Producto;
  cont:number=0;
  FormFactura: FormGroup;
  idFactura:number;
  private data$: Observable<number>;
  public currentDate:Date  ;
  constructor(
    private facturaServ: FacturaService,
    private facturaDetalleServi: FacturaDetalleService,
    private fb: FormBuilder,private router: Router,
    private facturGetService: FacturaGetService
  ) {
    this.currentDate = new Date("2015/03/25");
  this.data$=facturGetService.factura;

  this.data$.subscribe(
    result=>{
      this.idFactura = result;
    }
  );

  }

  ngOnInit() {
    if(this.idFactura!=-1){
      this.loadFormularioEdit();

    }
    this.rows = this.detallesSave;

    this.FormFactura = this.fb.group({
      date: ['', Validators.required],
      folio: ['', Validators.required],
      eMailCliente: ['', Validators.required],
      nameCliente: ['', Validators.required],
      lastNameCliente: ['', Validators.required],
      description: ['', Validators.required],
      observation: ['', Validators.required],
      nameProduct: ['',[Validators.required]],
      productPrice: ['',[Validators.required] ],
      productAmount: ['', Validators.required],
    });

    // this.rows=this.rows
  }

  async loadDetalleStatic() {
    this.submittedProduct=true;
    if(this.FormFactura.get('nameProduct').valid &&
    this.FormFactura.get('productPrice').valid &&
    this.FormFactura.get('productAmount').valid){
      this.loadDetalle()
      this.cont++;
      this.detalleStatic={
        id:this.cont,
        cantidad: this.FormFactura.value.productAmount,
        producto: {
          nombre: this.FormFactura.value.nameProduct,
          precio: this.FormFactura.value.productPrice,
        },
      }
      this.rows = this.detallesSave;
      this.rows = [...this.rows]
      this.clearDetalle()
      this.submittedProduct=false;
    }
  }

  loadDetalle(){
    this.detalle={
      cantidad: this.FormFactura.value.productAmount,
      producto: {
        nombre: this.FormFactura.value.nameProduct,
        precio: this.FormFactura.value.productPrice,
      },
    }
    this.detallesSave.push(this.detalle);
  }

  deleteDetalle(id: any) {

    var i = this.detallesSave.indexOf( id );
    if ( i !== -1 ) {
      this.detallesSave.splice( i, 1 );
      this.rows = this.detallesSave;
      this.rows = [...this.rows]
    }

  }


  clearDetalle() {
    this.FormFactura.patchValue({
      productAmount: '',
      nameProduct: '',
      productPrice: '',
    });
  }

  /**
   * factura
   */
  loadFactura(){
    this.factura={
     fecha:this.FormFactura.value.date,
     descripcion:this.FormFactura.value.description,
     folio: this.FormFactura.value.folio,
     observacion: this.FormFactura.value.observation,
     cliente: {
       id:this.factura.cliente.id,
       eMail: this.FormFactura.value.eMailCliente,
       name: this.FormFactura.value.nameCliente,
       lastName: this.FormFactura.value.lastNameCliente
     },
     detalle:[]=this.detallesSave

   }
 }

 loadFacturaForAlta(){
  this.factura={
    fecha: this.fechad(this.FormFactura.value.date),
    descripcion:this.FormFactura.value.description,
    folio: this.FormFactura.value.folio,
    observacion: this.FormFactura.value.observation,
    cliente: {
      eMail: this.FormFactura.value.eMailCliente,
      name: this.FormFactura.value.nameCliente,
      lastName: this.FormFactura.value.lastNameCliente
    },
    detalle:[]=this.detallesSave
 }
}


  saveFactura() {

    this.submittedFactura=true;
    if(this.FormFactura.get('folio').valid && this.FormFactura.get('nameCliente').valid
    && this.FormFactura.get('lastNameCliente').valid && this.FormFactura.get('observation').valid
    && this.FormFactura.get('description').valid && this.FormFactura.get('eMailCliente').valid
     && this.detallesSave.length>0){
      this.loadFacturaForAlta();
      this.facturaDetalleServi.saveFactura(this.factura).subscribe(
            (result)=>{
              this.facturGetService.facturaObservableData=-1
            }
      );
      this.submittedFactura=false;
      this.goBack();
    }
  }

  updateFactura(){
    this.loadFactura();
    if(this.FormFactura.get('folio').valid && this.FormFactura.get('nameCliente').valid
    && this.FormFactura.get('lastNameCliente').valid && this.FormFactura.get('observation').valid
    && this.FormFactura.get('description').valid && this.FormFactura.get('eMailCliente').valid
     && this.detallesSave.length>0){
      this.facturaDetalleServi.updateFactura(this.idFactura,this.factura).subscribe(
        (result)=>{

        }

      );
      this.facturGetService.facturaObservableData=-1;
      this.submittedFactura=false;
      this.goBack();
     }

  }

  loadFormularioEdit(){
    this.facturaDetalleServi.getById(this.idFactura).subscribe(
      result=>{
        this.factura= result;
        this.loadFormularioFactura();

      }
    )
  }


  loadFormularioFactura(){
    this.FormFactura.patchValue({
      folio:this.factura.folio,
      date: this.fechad(new Date(this.factura.fecha)),
      eMailCliente: this.factura.cliente.eMail,
      nameCliente:  this.factura.cliente.name,
      lastNameCliente: this.factura.cliente.lastName,
      description: this.factura.descripcion,
      observation: this.factura.observacion,
    });
    this.detallesSave=this.factura.detalle
    this.rows = this.detallesSave;
    this.rows = [...this.rows]
  }


  public  formatFecha(fecha:Date) {
    let dia = fecha.getDate();
    let  mes:number = fecha.getMonth()+1;
    let anio = fecha.getFullYear();
    if(mes>0 && mes<10){
      let mesString = ("0"+mes.toString());
     return anio.toString()+"-"+mesString.toString()+"-"+dia.toString();
     }else{
       let mesString = (mes.toString());
       return anio.toString()+"-"+mesString.toString()+"-"+dia.toString();
     }

   }
   fechad(fecha:Date){
     var date = new Date(fecha);
     const format='yyyy-MM-dd';
     const local='en-US';
     const formt = formatDate(date,format,local);
    return formt;
   }

  goBack() {
    this.router.navigate(['/factura']);
    this.facturGetService.facturaObservableData=-1;
  }


}
