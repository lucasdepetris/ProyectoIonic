import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HTTP } from '@ionic-native/http';
import { sucursal } from '../../app/modelo/sucursal';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  lati;
  long;
  sucursales = [];
  total:any;
  precio:Number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private zbar:ZBar,
              private androidPermissions: AndroidPermissions,
              private http: HTTP,
              public loadingCtrl: LoadingController,
              private geolocation: Geolocation) 
        {
          storage.get('id').then((val) => {
          this.mostrarProducto(val);
          });
           this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)
           .then(success => console.log('Permission granted'),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
                );
        }
  escanear(){
     let options: ZBarOptions = {
                      flash: 'off',
                      drawSight: false
                    };
     this.zbar.scan(options)
     .then(result => {
        let loader = this.loadingCtrl.create({
              content: "Please wait...",
              duration: 6000
          });
        loader.present();
        this.geolocation.getCurrentPosition().then((resp) => {
        this.lati = resp.coords.latitude;
        this.long = resp.coords.longitude;
        let params = {
                  id_producto:result,
                  lat:resp.coords.latitude,
                  lng:resp.coords.longitude,
                  limit:10
            }
        this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/producto', params, {})
          .then((response)=>{
            response.data = JSON.parse(response.data);
            this.sucursales = response.data.sucursales;
            this.total = response.data.total;
            loader.dismiss();
            })
          .catch(err=> {
                loader.dismiss();
                alert(err);
            });
        })
        .catch((error) => {
                            loader.dismiss();
                            alert('Error getting location'+error);
                          });
        })
        
    }
mostrarProducto(id:number){
    let loader = this.loadingCtrl.create({
          content: "Please wait...",
           duration: 6000
          });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lati = resp.coords.latitude;
        this.long = resp.coords.longitude;
        let parametros = {
               id_producto:id,
               lat:this.lati,
               lng:this.long,
               limit:10
              }
        this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/producto', parametros, {})
          .then((response)=>{
              response.data = JSON.parse(response.data);
              this.sucursales = response.data.sucursales;
              this.total = response.data.total;
              loader.dismiss();
            })
          .catch(error => {
                  loader.dismiss();
                  alert(error); // Error message
                });      
        })
        .catch((error) => {
                            loader.dismiss();
                            console.log('Error getting location', error);
                          });
    }
itemSelected(item:sucursal) {
     alert(item.banderaDescripcion);
    }
}
