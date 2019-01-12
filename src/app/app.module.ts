import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiInterfaceProvider } from '../providers/api-interface/api-interface';
import { SettingsProvider } from '../providers/settings/settings';
import { CacheModule } from 'ionic-cache';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    InAppBrowser,
    SettingsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiInterfaceProvider
  ]
})
export class AppModule {}
