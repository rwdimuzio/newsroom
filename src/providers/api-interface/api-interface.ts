import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SettingsProvider } from '../settings/settings'
import 'rxjs/add/observable/fromPromise';

/*
  Generated class for the ApiInterfaceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  https://newsapi.org

https://newsapi.org/docs/get-started

https://newsapi.org/v2/top-headlines?country=us&apiKey=891936083b324696939b66d8afa0b3fc
https://newsapi.org/v2/sources?apiKey=891936083b324696939b66d8afa0b3fc

891936083b324696939b66d8afa0b3fc
/v2/top-headlines
/v2/everything
/v2/sources 

*/
@Injectable()
export class ApiInterfaceProvider {
  // A global place to tell all the programs how to open external pages
  public browserOptions: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  sources = [];


  apiUrl: String = "https://newsapi.org";
  apiKey: String = "891936083b324696939b66d8afa0b3fc";
  constructor(public http: HttpClient, private settingsProvider: SettingsProvider) {
    console.log('Hello ApiInterfaceProvider Provider');
    settingsProvider.getValue("sources").then(res => {
      console.log(res);
      this.sources = res;
    }).catch(err => { });
  }

  public XgetUsHeadlines(): Observable<any> {
    return this.http.get(this.apiUrl + '/v2/top-headlines?country=us&pageSize=100&apiKey=' + this.apiKey);
  }
  public getHeadlinesByGroup(groupId) {
    return this.http.get(this.apiUrl + '/v2/top-headlines?category=' + groupId + '&language=us&sortBy=publishedAt&pageSize=100&apiKey=' + this.apiKey);
  }

  public getUsHeadlines(): Observable<any> {
    var sourceCat = "";
    this.sources.forEach(element => {
      if (sourceCat != "")
        sourceCat += ",";
      sourceCat += element.id;
    });
    console.log(sourceCat);
    var url = this.apiUrl + '/v2/everything?sources=' + sourceCat + '&language=en&pageSize=100&apiKey=' + this.apiKey;
    console.log(url);
    return this.http.get(url);
  }

  public getSources(): Observable<any> {

    return this.http.get(this.apiUrl + '/v2/sources?apiKey=' + this.apiKey);
  }

  public getSelectedSources(): any[] {
    return this.sources;
  }

  public toggleSource(item) {
    var x = this.sources.filter(row => row.id == item.id);
    if (x.length == 1) {
      var newlist = this.sources.filter(row => row.id != item.id); // remove it
      this.sources = newlist;
    } else {
      this.sources.push(item);
    }
    this.settingsProvider.setValue("sources", this.sources).then(res => {
      console.log(res);
    }).catch();
  }
  isSelected(item) {
    var x = this.sources.filter(row => row.id == item.id);
    return x.length >= 1;
  }
  loadSettings():Promise<any> {
    return this.settingsProvider.getValue("sources").then(res => {
      console.log(res);
      this.sources = res;
    });
  }
}
