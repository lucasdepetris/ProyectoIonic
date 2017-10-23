import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { producto} from '../../app/modelo/producto';
import { Storage } from '@ionic/storage';
import {PerfilPage} from '../perfil/perfil';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductoServiceProvider } from '../../providers/producto-service/ProductoProvider';
/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HTTP,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              private geolocation:Geolocation,
              private productoService : ProductoServiceProvider) {
  }
  nombreProducto:string;
  lati;
  long;
  productos;
  buscar()
    {
      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 7000
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lati = resp.coords.latitude;
        this.long = resp.coords.longitude;
        let params = {
          string:this.nombreProducto,
          lat:resp.coords.latitude,
          lng:resp.coords.longitude,
          limit:10
        }
        var re;
        re = this.productoService.getProductos(params);
        re.then(
          resolved => this.productos = (resolved),
          error => alert(error)
        );
        
        /*var ms = this.productoService.getPrueba();
        alert(ms);
        this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
        .then((response)=>{
          response.data = JSON.parse(response.data);
          this.productos = response.data.productos;
          loader.dismiss();
          })
        .catch(error => {
            loader.dismiss();
            alert(error); // Error message
          });*/
        })
        .catch((error) => {
                            loader.dismiss();
                            alert('Error getting location'+ error);
                          });
     
    }
  productoElegido(prod:producto)
    {
            this.storage.set('id',prod.id); 
            this.navCtrl.push(PerfilPage);
    }
}
