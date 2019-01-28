import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiInterfaceProvider } from '../../providers/api-interface/api-interface';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  articles = null;
  loading: boolean = false;
  noSources: boolean = false; // hope for best
  constructor(public navCtrl: NavController, private apiInterfaceProvider: ApiInterfaceProvider, private inAppBrowser: InAppBrowser) {

  }

  ionViewWillEnter() {
    this.apiInterfaceProvider.loadSettings().then(() => {
      if (this.apiInterfaceProvider.getSelectedSources().length == 0) {
        this.noSources = true;
        console.log("no data - no sources?");
        this.articles = [];
      } else {
        this.noSources = false;
        this.doRefresh(null);
      }
    }
    )
  }

  open(url) {
    console.log("click: " + url);
    let target = "_system";
    this.inAppBrowser.create(url, target, this.apiInterfaceProvider.browserOptions);
  }
  doRefresh(refresher) {
    this.loading = true;
    this.apiInterfaceProvider.getHeadlines().subscribe((res) => {
      this.loading = false;
      this.noSources = false;
      console.log(res);
      if (res.articles) {
        this.articles = res.articles;
      } else {
        console.log("epic fail");
      }
    }, (err) => {
      this.loading = false;
      if (this.apiInterfaceProvider.getSelectedSources().length == 0) {
        this.noSources = true;
        console.log("no data - no sources?");
        this.articles = [];
      }
    }, () => {
      if (refresher != null) {
        refresher.complete();
      }
    });
  }
}
