import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaDetalleService {
  apiFactura = environment.apiURL + 'factura';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  saveFactura(factura: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.apiFactura,factura, httpOptions);
  }

  getById(id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(this.apiFactura+"/list/"+id, httpOptions);
  }

  updateFactura(id:any,factura:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put(this.apiFactura+'/'+id,factura,httpOptions);
  }
}
