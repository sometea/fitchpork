import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ArticlesService {
  private items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFireDatabase) { 
    this.items = this.af.list('/articles', {
      query: {
        limitToLast: 50
      }
    });
  }

  getArticles() {
    return this.items;
  }

  addArticle(article) {
    this.items.push(article);
  }
}
