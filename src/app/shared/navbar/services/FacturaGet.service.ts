import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacturaGetService {

  private lo: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  get factura(){
   return this.lo.asObservable();
  }

  set facturaObservableData(idFact: number) {
    this.lo.next(idFact);
  }


}
