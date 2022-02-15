import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  nameCliente:string;
  apiFactura = environment.apiURL + 'factura';



constructor(private http: HttpClient) { }

headers: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

    getListFactura(): Observable<any> {
      const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      };
        return this.http.get(this.apiFactura = environment.apiURL + 'factura', httpOptions)
    }

    getListFacturaByCliente(nameCliente :string){
      const httpOptions = {
        headers : new HttpHeaders({
          "Content-Type": "application/json",
        })
      }
      return this.http.get(this.apiFactura+"/listar/porCliente",{params: {
        name: nameCliente,
      }});
    }

    getListFacturaByFecha(Fdesde :string, Fhasta:string){
      const httpOptions = {
        headers : new HttpHeaders({
          "Content-Type": "application/json",
        })
      }
      return this.http.get(this.apiFactura+"/listar/porFecha",{params: {
        desde: Fdesde,
        hasta: Fhasta
      }});
    }

}
