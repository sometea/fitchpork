import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Article } from "./edit-article/article";
import { Observable } from 'rxjs';

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

  list(): Observable<Article[]> {
    return this.items;
  }

  get(key: string): Observable<Article> {
    return this.af.object('/articles/' + key);
  }

  add(article: Article): Observable<string> {
    return Observable.fromPromise(this.items.push(article)).map(item => item.key);
  }

  remove(key: string) {
    this.items.remove(key);
  }

  update(key: string, newArticle: Article) {
    this.items.update(key, newArticle);
  }
}
