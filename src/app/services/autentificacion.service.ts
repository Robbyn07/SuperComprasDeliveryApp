
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  public estaLogeado: any = false;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) { 
    afAuth.authState.subscribe(user => (this.estaLogeado = user));
  }

  //login
  async onLogin (user: Usuario) {
    try{
      return await this.afAuth.signInWithEmailAndPassword( user.email, user.password)
    }catch(error) {
      console.log( 'error en LOGIN' , error );
    }
  }

  //registro
  async onRegistro (user: Usuario){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

    } catch(error){
      console.log("error en REGISTRO  " , error);
    }
  }

  emailV: any;
  //verificacion quien inicio sesion
  async verificacion(){
    try{
      console.log(" VER " , (await this.afAuth.currentUser).uid) ;
      this.emailV = (await this.afAuth.currentUser).email;
      console.log(" VER 2  " ,  this.emailV);
      return this.emailV;
      
    }catch(error){
      console.log("error en envio de verificacion")
    }
    
  }

  // cierra sesion
  salirCuenta() {
    console.log("Logout ")
    this.afAuth.signOut;
  }

  // guarda usuario
  save(user: Usuario){
    const refContactos = this.afs.collection("usuario");

    if(user.id == null){
      user.id = this.afs.createId();
      user.rol = "cliente";
    }
    refContactos.doc(user.id).set(Object.assign({}, user));

  }

  ver: Usuario = new Usuario();

  getUsuario(email: any) {
    console.log("llega getUser")
    return this.afs.collection("usuario", ref => ref.where("email", "==", email)).valueChanges();

  }


}
