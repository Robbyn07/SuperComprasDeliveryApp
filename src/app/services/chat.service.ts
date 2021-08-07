import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../domain/chat'; 

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  itemCollection: any;
  constructor(public afs: AngularFirestore) { }

  generarId(){
    const refContactos = this.afs.collection("chat");

    return this.afs.createId();
  }

  save(chat:Chat){
    const refContactos = this.afs.collection("chat");

    if(chat.id == null){
      chat.id = this.afs.createId();
    }

    refContactos.doc(chat.id).set(Object.assign({},chat));

  }

  getChat(id:string): Observable<any[]>{
    /*this.itemCollection = this.afs.collection("chat", ref => ref.where("idPedido", "==", id).where("numero","==",1));
    return this.itemCollection.valueChanges();*/

    
    /*return this.afs.collection("chat",
        ref => ref.where("idPedido", "==", id).where("numero","==",1)).valueChanges();*/

    return this.afs.collection("chat",
        ref => ref.where("idPedido", "==", id)).valueChanges();
  }
}
