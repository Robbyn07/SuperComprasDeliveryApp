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

  getPedido(id:string): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("id", "==", id)).valueChanges();
  }

  getPedidosFinalizadosCliente(id:string): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("idCliente", "==", id).where("estado","==","Finalizado")).valueChanges();
  }

  getPedidosEnviadoCliente(id:string): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("estado","==","Enviado").where("idCliente","==",id)).valueChanges();
  }

  getPedidosAceptadoCliente(id:string): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("estado","==","Aceptado").where("idCliente","==",id)).valueChanges();
  }

  getPedidosEntregandoCliente(id:string): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("estado","==","Entregando").where("idCliente","==",id)).valueChanges();
  }



  getPedidosEnviados(): Observable<any[]>{
    return this.afs.collection("pedido",
        ref => ref.where("estado", "==", "Enviado")).valueChanges();
  }

}
