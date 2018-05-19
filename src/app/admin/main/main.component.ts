import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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

  ngOnInit() {
  }

}
