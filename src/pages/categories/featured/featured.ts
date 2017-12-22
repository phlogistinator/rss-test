import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { EntryPage } from '../../entry/entry';
import { Http } from '@angular/http';
import 'rxjs';

import { RssFeedProvider } from '../../../providers/rss-feed/rss-feed';

@Component({
  selector: 'page-featured',
  templateUrl: 'featured.html',
})
export class FeaturedPage {

  news: any;
  pageNo = 1;
  category: string = 'featured';
  errorMessage: string;

  constructor(
    public toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    private http: Http, 
    public loadCtrl: LoadingController,
    private rss: RssFeedProvider
  ) {  }

  refreshMe(refresher){
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended.');
      refresher.complete();
    }, 2000);
  }
  
  ionViewDidLoad() {
    let loading = this.loadCtrl.create({
      content: "Fetching latest articles..."
    });

    loading.present();
    console.clear();
    console.log('Hello, beautiful people of the Philippines!');

    this.rss.getTheGoods(this.pageNo, this.category).then(data => {
      this.news = data;
    });
    console.log(this.news);
    loading.dismiss();
    this.pageNo++;
    let toast = this.toast.create({
      message: 'Showing only featured news.',
      duration: 3000
    });

    toast.present();
  }

  openEntry(entry){
    let data = {
      entryData: entry 
    }

    let modal = this.modalCtrl.create(EntryPage, data);
    modal.present();
  }
  
  toInfinityAndBeyond(infiniteScroll){
    setTimeout(() => {
      this.pageNo = this.pageNo+1;
      this.getTheGoods(this.pageNo, this.category),
      error => this.errorMessage = <any> error;

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }

  getTheGoods(pageNo: number, category: string){
    this.http.get('https://www.saipantribune.com/index.php/wp-json/posts?page='+pageNo+'&filter[category_name]='+category).map(res => res.json()).subscribe(allNews =>{
      console.log("total number of data: "+allNews.length);
      for(let i = 0; i<allNews.length; i++){
        this.news.push(allNews[i]);
      }
    });
  }


}
