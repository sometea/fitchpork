import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Article, ArticleWithKey, ArticleType } from './admin/edit-article/article';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';

const path = '/articles';

@Injectable()
export class ArticlesService {
  constructor(private af: AngularFireDatabase) {}

  list(type?: ArticleType): Observable<ArticleWithKey[]> {
    const items = type ?
      this.af.list<Article>(path, ref => ref.limitToFirst(10).orderByChild('type').equalTo(type)) :
      this.af.list<Article>(path, ref => ref.limitToFirst(10));
    return items.snapshotChanges().map(actions => actions.map(action => {
      return {
        key: action.key,
        article: action.payload.val()
      };
     }));
  }

  get(key: string): Observable<Article> {
    return this.af.object<Article>('/articles/' + key).valueChanges();
  }

  add(article: Article): Observable<string> {
    return Observable.fromPromise(this.items().push(article)).map(item => item.key);
  }

  remove(key: string) {
    this.items().remove(key);
  }

  update(key: string, newArticle: Article) {
    this.items().update(key, newArticle);
  }

  private items(): AngularFireList<Article> {
    return this.af.list<Article>(path, ref => ref.limitToFirst(10));
  }
}
