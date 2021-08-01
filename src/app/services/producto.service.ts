import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../domain/producto'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(public afs: AngularFirestore) { }

  getProductos(): Observable<any[]>{
    return this.afs.collection("producto").valueChanges();
  }

  getProductosCategoria(categoria:string): Observable<any[]>{
    return this.afs.collection("producto",
        ref => ref.where("categoria", "==", categoria)).valueChanges();
  }
}
