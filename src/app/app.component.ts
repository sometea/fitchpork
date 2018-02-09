import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ArticlesService } from './articles.service';
import { Article } from "./edit-article/article";
import { AuthenticationService, User } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  loggedIn: Observable<boolean>;
  userToLogIn: User;
  errorMessage: string;

  constructor(private auth: AuthenticationService) {
    this.user = this.auth.getAuthState();
    this.loggedIn = this.auth.isLoggedIn();
    this.userToLogIn = {
      email: '',
      password: '',
    };
    this.errorMessage = '';
  }

  login() {
    this.auth.login(this.userToLogIn).subscribe(message => {
      this.errorMessage = message;
    });
  }

  logout() {
    this.auth.logout();
  }
}
