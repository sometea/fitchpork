import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Article } from "./edit-article/article";

@Injectable()
export class ArticlesService {
  private items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { 
    this.items = this.af.list('/articles', {
      query: {
        limitToLast: 50
      }
    });
  }

  getArticles(): FirebaseListObservable<Article[]> {
    return this.items;
  }

  addArticle(article: Article) {
    this.items.push(article);
  }

  removeArticle(key: string) {
    this.items.remove(key);
  }

  updateArticle(key: string, newArticle: Article) {
    this.items.update(key, newArticle);
  }
}
