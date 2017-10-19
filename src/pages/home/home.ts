import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import {PerfilPage} from '../perfil/perfil';
import {ProductosPage} from '../productos/productos';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  idUser;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              private googlePlus: GooglePlus,
              private storage: Storage,
              private androidPermissions: AndroidPermissions) {

      storage.set('name', 'Max');  
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.GET_ACCOUNTS).then(
  success => console.log('Permission granted'),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.GET_ACCOUNTS)
); 
  }
 presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
   presentToasterror(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  loginUser(){
    
     this.googlePlus.login({
    'webClientId': '100745979914-8175s3kfr486tvr425qs0t8314uac2og.apps.googleusercontent.com',
    'offline': true
  })
    .then((succes)=>{
        alert('login correcto'+succes.email);
        alert(JSON.stringify(succes));
        this.navCtrl.push(ProductosPage);
    })
    .then(res => this.idUser = 1 )
    .catch(err=> this.presentToasterror(err));
  }
  opcEscanear(){
    this.navCtrl.push(PerfilPage);
  }
  opcBuscar(){
    this.navCtrl.push(ProductosPage);
  }
}
