export class Prueba{
  folio?: number;
  descripcion?: string;
  observacion?: string;
  fecha?: string;
  cliente?: Cliente;
  detalle?: Detalle[];


  constructor(
    folio?: number,
    descripcion?: string,
    observacion?: string,
    fecha?: string,
    cliente?: Cliente,
    detalle?: Detalle[]
) {
    this.folio = folio
    this.descripcion = descripcion
    this.observacion = observacion
    this.fecha = fecha
    this.cliente = cliente
    this.detalle = detalle
  }


}

export class Cliente {
  name: string;
  lastName: string;
  eMail: string;
}


export class Producto {
  nombre: string;
  precio: number;
}

export class Detalle {
  cantidad: number;
  producto: Producto;
}
