export interface Factura {
  id?:number;
  folio?: number;
  descripcion?: string;
  observacion?: string;
  fecha?: string;
  cliente?: Cliente;
  detalle?: Detalle[];

}
export interface Cliente {
  id?:number;
  name: string;
  lastName: string;
  eMail: string;
}

export interface Producto {
  id?:number;
  nombre: string;
  precio: number;
}

export interface Detalle {
  id?:number;
  cantidad: number;
  producto: Producto;
}


export interface detalleStatic{
  id:number;
  cantidad: number;
  producto: Producto;
}
