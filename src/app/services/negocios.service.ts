import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Negocio } from '../domain/negocio'; 

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  constructor(public afs: AngularFirestore) { }

  getNegocios(): Observable<any[]>{
    return this.afs.collection("local").valueChanges();
  }

  getNegocio(id:string): Observable<any[]>{
    return this.afs.collection("local",
        ref => ref.where("id", "==", id)).valueChanges();
  }
}
