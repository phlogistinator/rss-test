import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    
  }

  goAway(){
    let data = { keyword: '' };
    this.viewCtrl.dismiss(data);
  }

  searchThis(){
    let data = { keyword: this.searchTerm };
    this.viewCtrl.dismiss(data);
  }

}