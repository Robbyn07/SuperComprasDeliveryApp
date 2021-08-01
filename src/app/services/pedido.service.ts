import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pedido } from '../domain/pedido'; 

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public afs: AngularFirestore) { }

  generarId(){
    const refContactos = this.afs.collection("pedido");

    return this.afs.createId();
  }

  save(pedido:Pedido){
    const refContactos = this.afs.collection("pedido");

    if(pedido.id == null){
      pedido.id = this.afs.createId();
    }

    refContactos.doc(pedido.id).set(Object.assign({},pedido));

  }
}
