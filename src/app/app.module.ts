import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Global } from '../global/global';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CastDetailPage } from './cast-detail/cast-detail.page';
@NgModule({
  declarations: [AppComponent,
  CastDetailPage],
  entryComponents: [CastDetailPage],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule],
  providers: [
    StatusBar,
    Global,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
