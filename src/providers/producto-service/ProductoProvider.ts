import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { producto} from '../../app/modelo/producto';
/*
  Generated class for the ProductoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductoServiceProvider {

  constructor(public http: HTTP) {
    console.log('Hello ProductoServiceProvider Provider');
    
  }
 async getProductos(params) {
   await this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
        .then((response)=>{
          response.data = JSON.parse(response.data);
          return  response.data.productos;
          })
        .catch(error => {
            alert(error); // Error message
          });
        
    /*
   await this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
        .then((response)=>{
          response.data = JSON.parse(response.data);
          return response.data.productos;
          })
        .catch(error => {
            alert(error); // Error message
          });*/
  }
  getPrueba():String{
    var msg = "holaprueba";
    return msg;
  }      
}
