import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Article, ArticleWithKey } from "./edit-article/article";
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database/interfaces';

@Injectable()
export class ArticlesService {
  private items: AngularFireList<Article>;

  constructor(private af: AngularFireDatabase) {
    this.items = this.af.list<Article>('/articles', ref => ref.limitToFirst(10));
  }

  list(): Observable<ArticleWithKey[]> {
    return this.items.snapshotChanges().map(actions => actions.map(action => {
      let articleWithKey: ArticleWithKey = {
        key: action.key,
        article: action.payload.val()
      };
      return articleWithKey;
     }));
  }

  get(key: string): Observable<Article> {
    return this.af.object<Article>('/articles/' + key).valueChanges();
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
