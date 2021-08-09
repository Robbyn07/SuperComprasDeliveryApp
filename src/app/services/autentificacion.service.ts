
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../domain/usuario';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  public user: Observable<any>;
  public estaLogeado: any = false;
  nombre: any;
  correo: any;
  direccion: any;
  ID:any;
  ROL: any;

  u: Usuario = new Usuario();


  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private platform: Platform, private googlePlus: GooglePlus) { 
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
      //console.log(" VER " , (await this.afAuth.currentUser).uid) ;
      this.emailV = (await this.afAuth.currentUser).email;
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


  getUsuario(email: any) {
    console.log("llega getUser")
    return this.afs.collection("usuario", ref => ref.where("email", "==", email)).valueChanges();

  }

  // LOGIN CON GOOGLE

  async nativeGoogleLogin(): Promise<void>  {
    try {
      const gplusUser: any = await this.googlePlus.login({
        webClientId: environment.googleWebClientId,
        offline: true
      });

      const googleCredential = firebase.default.auth.GoogleAuthProvider.credential(gplusUser.idToken);
      const firebaseUser = await firebase.default.auth().signInWithCredential(googleCredential);
      //console.log(JSON.stringify(firebaseUser.user));
      this.nombre = firebaseUser.additionalUserInfo.profile;
      this.correo = firebaseUser.additionalUserInfo.profile;
      this.direccion = "Av loja y sucre";
      console.log("datos de google user ", this.nombre);
      
      this.u.nombre = this.nombre.name;
      this.u.direccion = this.direccion;
      this.u.email = this.correo.email;
      console.log(this.u);
      return this.save(this.u);

     //return await this.updateUserData(firebaseUser.user, 'google');

    } catch (error) {
      console.error('Error: Login Google - Native' + JSON.stringify(error));
      return error;
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.default.auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      //console.log(JSON.stringify(credential.user));
      this.nombre = credential.additionalUserInfo.profile;
      this.correo = credential.additionalUserInfo.profile;
      this.direccion = "Av loja y sucre";
      console.log("datos de google user ", this.nombre);
      
      this.u.nombre = this.nombre.name;
      this.u.direccion = this.direccion;
      this.u.email = this.correo.email;
      console.log(this.u);
      return this.save(this.u);

      //return await this.updateUserData(credential.user, 'google');
    } catch (error) {
      console.error('Error: Login Google - Web' + JSON.stringify(error));
      return error;
    }
  }

  async googleLogin() {
    if (this.platform.is('cordova')) {
      console.log("entra a google nativo")
      return await this.nativeGoogleLogin();
    } else {
      console.log("entra a google web ")
      return await this.webGoogleLogin();
    }
  }

  save2(nom:any, dir: any, corr: any, id:any, rol:any){
    const refContactos = this.afs.collection("usuario");

    if(id == null){
      id = this.afs.createId();
      rol = "cliente";
    }
    refContactos.doc(id).set(Object.assign({}));

  }

  /*
  async onLoginGoogle(){
    try {
      const { user } = await this.afAuth.signInWithPopup(new )
    } catch (error) {
      
    }
  }
  */
  getUsuarioId(id: string) {
    return this.afs.collection("usuario", ref => ref.where("id", "==", id)).valueChanges();

  }

/*
  async onLoginGoogle() {
    try {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.router.navigate(['/menu-p'])

        this.afstore.doc(usuarios/${res.user.uid}).set({

            nombre: res.user.displayName ,
            correo: res.user.email,
            clave: null,
            activo: true,
            tipo: true,
            uid: res.user.uid
        })
        console.log(res);


        this.user.setUser({
            nombre: res.user.displayName ,
            correo: res.user.email,
            clave: null,
            activo: true,
            tipo: true,
            uid: res.user.uid
        })




    } catch (error) {
      console.log('Error->', error);
    }
  }
  */



}
