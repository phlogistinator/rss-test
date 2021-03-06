import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs';

@Injectable()
export class RssFeedProvider {

  data: any;

  constructor(public http: Http) {
    console.log('Hello, RSS Feed Provider!');
  }
  
  getTheGoods(page: number, category: string){
    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://www.saipantribune.com/index.php/wp-json/posts?page='+page+'filter[category_name]='+category).map(res => res.json()).subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  getFeaturedImage(pageNo: number){
    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://www.saipantribune.com/index.php/wp-json/media?page='+pageNo).map(res => res.json()).subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

}
