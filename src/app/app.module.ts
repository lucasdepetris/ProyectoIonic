import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import {ProductosPage} from '../pages/productos/productos';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { ZBar} from '@ionic-native/zbar';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ProductoServiceProvider } from '../providers/producto-service/ProductoProvider';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    ProductosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    ProductosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    ZBar,
    AndroidPermissions,
    HTTP,
    ProductoServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
