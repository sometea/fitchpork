import { Component } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ArticlesService } from './articles.service';
import { Article } from "./edit-article/article";
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  loggedIn: Observable<boolean>;

  constructor(private auth: AuthenticationService) {
    this.user = this.auth.getAuthState();
    this.loggedIn = this.auth.isLoggedIn();
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
