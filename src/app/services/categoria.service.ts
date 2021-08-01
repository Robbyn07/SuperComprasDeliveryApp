import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categoria } from '../domain/categoria'; 

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(public afs: AngularFirestore) { }

  getCategorias(): Observable<any[]>{
    return this.afs.collection("categoria").valueChanges();
  }
}
