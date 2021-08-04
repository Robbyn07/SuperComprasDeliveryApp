import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PedidoDetalle } from '../domain/pedidoDetalle'; 

@Injectable({
  providedIn: 'root'
})
export class PedidoDetalleService {

  constructor(public afs: AngularFirestore) { }

  generarId(){
    const refContactos = this.afs.collection("pedido-detalle");

    return this.afs.createId();
  }

  save(pedidoDetalle:PedidoDetalle){
    const refContactos = this.afs.collection("pedido-detalle");

    if(pedidoDetalle.id == null){
      pedidoDetalle.id = this.afs.createId();
    }

    refContactos.doc(pedidoDetalle.id).set(Object.assign({},pedidoDetalle));

  }

  getDetalle(id:string): Observable<any[]>{
    return this.afs.collection("pedido-detalle",
        ref => ref.where("idPedido", "==", id)).valueChanges();
  }
}
