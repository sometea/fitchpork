import { Component } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ArticlesService } from './articles.service';
import { Article } from "./edit-article/article";
import { AuthenticationService } from "./authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: Observable<firebase.User>;

  constructor(private auth: AuthenticationService, private articlesService: ArticlesService) {
    this.user = this.auth.getAuthState();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
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
