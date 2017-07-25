import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ArticlesService {

  constructor(public af: AngularFireDatabase) { }

  getArticles() {
    return this.af.list('/articles', {
      query: {
        limitToLast: 50
      }
    });
  }

}
