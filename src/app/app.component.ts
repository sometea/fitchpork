import { Component } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ArticlesService } from './articles.service';
import { Article } from "./edit-article/article";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public articlesService: ArticlesService) {
    this.user = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  addArticle() {
    const newArticle: Article = {
      title: 'A new article',
      text: 'Just added!',
      date: 'Today'
    };
    this.articlesService.addArticle(newArticle);
  }

  removeArticle(key: string) {
    this.articlesService.removeArticle(key);
  }
}
