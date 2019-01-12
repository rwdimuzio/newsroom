import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiInterfaceProvider } from '../../providers/api-interface/api-interface';
import { InAppBrowser} from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  sources:any[]=null;
  loading:boolean;
  constructor(public navCtrl: NavController, private apiInterfaceProvider: ApiInterfaceProvider, private inAppBrowser: InAppBrowser) {
  }

  ionViewDidEnter() {
    this.doRefresh(null);
  }

  open(url) {
    console.log("click: " + url);
    let target = "_system";
    this.inAppBrowser.create(url, target, this.apiInterfaceProvider.browserOptions);
  }

  doRefresh(refresher){
    this.loading=true;
    if(refresher!=null){
      refresher.complete();
    }
    this.apiInterfaceProvider.getSources().subscribe((res) => {
      console.log(res);
      if (res.sources) {
        var filtered = res.sources.filter(row => row.language=='en');
        this.sources = filtered;
        this.loading=false;
      } else {
        console.log("epic fail");
        this.loading=false;
      }

    },(err) => {

    });
  }

  toggleSource(item){
    console.log("toggleSource");
    console.log(item);
    this.apiInterfaceProvider.toggleSource(item);
  }
  isSelected(item){
    var i =     this.apiInterfaceProvider.isSelected(item);
    return i;
  }
  getSelectedSources(){
    return this.apiInterfaceProvider.getSelectedSources();
  }

}
